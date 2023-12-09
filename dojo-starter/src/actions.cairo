
// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn spawn(self: @TContractState);
    fn setSecret(self: @TContractState, value: u8);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use starknet::{ContractAddress, get_caller_address};
    use project::models::{Secret, Game, Piece, Player};
    use super::IActions;

    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Update: Updated
    }

    // declaring custom event struct
    #[derive(Drop, starknet::Event)]
    struct Updated {
        player: ContractAddress,
        value: u8
    }

    // impl: implement functions specified in trait
    #[external(v0)]
    impl ActionsImpl of IActions<ContractState> {
        // ContractState is defined by system decorator expansion
        fn spawn(self: @ContractState) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let game_id:felt252 = world.uuid().into();
            let player_id:felt252 = world.uuid().into();

            let piece_id_0:felt252 = world.uuid().into();
            let piece_id_1:felt252 = world.uuid().into();
            let piece_id_2:felt252 = world.uuid().into();



            set!(
                world,
                (
                    Game {id:game_id, player_one:caller, player_two: caller, ones_turn: true},
                    Player{id:player_id, address: caller },
                    Piece {id: piece_id_0, owner: caller, location_id: player_id, piece_type: 0},
                    Piece {id: piece_id_1, owner: caller, location_id: player_id, piece_type: 1},
                    Piece {id: piece_id_2, owner: caller, location_id: player_id, piece_type: 2},
                    Secret {owner: caller, value:7}

                )
            );
        }

        // Implementation of the move function for the ContractState struct.
        fn setSecret(self: @ContractState, value: u8) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            set!(world, (Secret {owner: caller, value: value}));

            // Emit an event to the world to notify about the player's move.
            emit!(world, Updated { player:caller, value });
        }
    }
}
