use starknet::{ContractAddress};

// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn spawn(self: @TContractState);
    fn set_secret(self: @TContractState, value: u8);
    fn challenge(self: @TContractState, opp: ContractAddress, game_type: u8);
    fn tic_tac_toe_challenge(self: @TContractState, opp:ContractAddress);
    fn create_pieces(self: @TContractState);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use starknet::{ContractAddress, get_caller_address};
    use project::models::{Secret, Game, Piece, Player, Square};
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

            let player_id = world.uuid();

            set!(
                world,
                (
                    Player{id:player_id, address: caller },

                    Secret {owner: caller, value:7},


                )
            );

            self.challenge(caller, 0);
            self.create_pieces();

            
        }

        // Implementation of the move function for the ContractState struct.
        fn set_secret(self: @ContractState, value: u8) {
            // Access the world dispatcher for reading.
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            set!(world, (Secret {owner: caller, value: value}));

            // Emit an event to the world to notify about the player's move.
            emit!(world, Updated { player:caller, value });
        }

        fn challenge(self: @ContractState, opp: ContractAddress, game_type: u8){
            let world = self.world_dispatcher.read();

            let caller = get_caller_address();

            assert(game_type == 0, 'only type 0 supported');
            self.tic_tac_toe_challenge(opp);

        }

        fn tic_tac_toe_challenge(self: @ContractState, opp:ContractAddress){
            let world = self.world_dispatcher.read();

            let caller = get_caller_address();

            let game_id = world.uuid();

            set!(world,
                (
                    Game { game_id, game_type:0, player_one:caller, player_two:opp, ones_turn:true},

                    Square {game_id, x:0, y:0, piece_id: 0},
                    Square {game_id, x:1, y:0, piece_id: 0},
                    Square {game_id, x:2, y:0, piece_id: 0},
                    Square {game_id, x:0, y:1, piece_id: 0},
                    Square {game_id, x:1, y:1, piece_id: 0},
                    Square {game_id, x:2, y:1, piece_id: 0},
                    Square {game_id, x:0, y:2, piece_id: 0},
                    Square {game_id, x:1, y:2, piece_id: 0},
                    Square {game_id, x:2, y:2, piece_id: 0},
                )
            
            )

        }

        fn create_pieces(self: @ContractState){
            let world = self.world_dispatcher.read();

            let caller = get_caller_address();

            let caller_id = get!(world, caller, (Player)).id;

            set!(world,
                (
                    Piece {id: world.uuid(), owner: caller, location_id: caller_id, piece_type: 1},
                    Piece {id: world.uuid(), owner: caller, location_id: caller_id, piece_type: 1},
                    Piece {id: world.uuid(), owner: caller, location_id: caller_id, piece_type: 1},
                    Piece {id: world.uuid(), owner: caller, location_id: caller_id, piece_type: 1},
                    Piece {id: world.uuid(), owner: caller, location_id: caller_id, piece_type: 2},
                    Piece {id: world.uuid(), owner: caller, location_id: caller_id, piece_type: 2},
                    Piece {id: world.uuid(), owner: caller, location_id: caller_id, piece_type: 2},
                    Piece {id: world.uuid(), owner: caller, location_id: caller_id, piece_type: 2}
                )
            )    

        }


    }
}
