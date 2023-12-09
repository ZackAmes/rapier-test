use starknet::ContractAddress;


#[derive(Model, Drop, Serde)]
struct Secret {
    #[key]
    owner: ContractAddress,
    value: u8
}


#[derive(Model, Drop, Serde)]
struct Player {
    #[key]
    id: felt252,
    address: ContractAddress
}

#[derive(Model, Drop, Serde)]
struct Piece {
    #[key]
    id: felt252,
    owner: ContractAddress,
    location_id: felt252,
    piece_type: u8
}

#[derive(Model, Drop, Serde)]
struct Game {
    #[key]
    id: felt252,
    player_one: ContractAddress,
    player_two: ContractAddress,
    ones_turn: bool
}