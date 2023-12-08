import { SetupNetworkResult } from "./setupNetwork";
import { Account, num } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { ClientComponents } from "./createClientComponents";
import { getEvents, setComponentsFromEvents } from "@dojoengine/utils";
import {uuid} from "@latticexyz/utils";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents }: SetupNetworkResult,
    { Secret }: ClientComponents
) {
    const spawn = async (signer: Account) => {
        const entityId = signer.address.toString() as Entity;
        console.log("spawning");

        try {
            const { transaction_hash } = await execute(
                signer,
                "actions",
                "spawn",
                []
            );

            setComponentsFromEvents(
                contractComponents,
                getEvents(
                    await signer.waitForTransaction(transaction_hash, {
                        retryInterval: 100,
                    })
                )
            );
        } catch (e) {
            console.log(e);
        }
    }    
    
    
  const setSecret = async (signer: Account, value: number) => {
    const entityId = signer.address.toString() as Entity;

    console.log("setting secret");
    const secretId = uuid();
    Secret.addOverride(secretId, {
      entity: entityId,
      value: {value: value},
    });

    try {
      const tx = await execute(signer, "actions", "setSecret", [value]);
      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await signer.waitForTransaction(tx.transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
      Secret.removeOverride(secretId);
    } finally {
      Secret.removeOverride(secretId);
    }
  }

    

    return {
        spawn,
        setSecret
    };
}
