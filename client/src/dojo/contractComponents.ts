/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export function defineContractComponents(world: World) {
  return {
	  Game: (() => {
	    return defineComponent(
	      world,
	      { id: RecsType.BigInt, player_one: RecsType.BigInt, player_two: RecsType.BigInt, ones_turn: RecsType.Boolean },
	      {
	        metadata: {
	          name: "Game",
	          types: ["felt252","contractaddress","contractaddress","bool"],
	          customTypes: [],
	        },
	      }
	    );
	  })(),
	  Piece: (() => {
	    return defineComponent(
	      world,
	      { id: RecsType.BigInt, owner: RecsType.BigInt, location_id: RecsType.BigInt, piece_type: RecsType.Number },
	      {
	        metadata: {
	          name: "Piece",
	          types: ["felt252","contractaddress","felt252","u8"],
	          customTypes: [],
	        },
	      }
	    );
	  })(),
	  Player: (() => {
	    return defineComponent(
	      world,
	      { id: RecsType.BigInt, address: RecsType.BigInt },
	      {
	        metadata: {
	          name: "Player",
	          types: ["felt252","contractaddress"],
	          customTypes: [],
	        },
	      }
	    );
	  })(),
	  Secret: (() => {
	    return defineComponent(
	      world,
	      { owner: RecsType.BigInt, value: RecsType.Number },
	      {
	        metadata: {
	          name: "Secret",
	          types: ["contractaddress","u8"],
	          customTypes: [],
	        },
	      }
	    );
	  })(),
	  Square: (() => {
	    return defineComponent(
	      world,
	      { game_id: RecsType.BigInt, x: RecsType.Number, y: RecsType.Number, piece_id: RecsType.BigInt },
	      {
	        metadata: {
	          name: "Square",
	          types: ["felt252","u8","u8","felt252"],
	          customTypes: [],
	        },
	      }
	    );
	  })(),
  };
}
