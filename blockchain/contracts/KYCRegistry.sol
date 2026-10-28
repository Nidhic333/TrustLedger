// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
contract KYCRegistry {
    address public immutable administrator;
    mapping(address => bool) public authorizedBanks;
    struct Credential { bytes32 credentialId; bytes32 commitmentHash; address issuingBank; uint64 issuedAt; uint64 expiresAt; bool revoked; bool exists; }
    mapping(bytes32 => Credential) private credentials;
    event BankAuthorizationChanged(address indexed bank, bool authorized);
    event CredentialIssued(bytes32 indexed credentialId, address indexed issuingBank, bytes32 commitmentHash, uint64 expiresAt);
    event CredentialRevoked(bytes32 indexed credentialId, address indexed actor);
    constructor() { administrator = msg.sender; }
    function authorizeBank(address bank, bool authorized) external { require(msg.sender == administrator, "Administrator only"); require(bank != address(0), "Zero bank"); authorizedBanks[bank] = authorized; emit BankAuthorizationChanged(bank, authorized); }
    function issueCredential(bytes32 id, bytes32 commitment, uint64 expiry) external { require(authorizedBanks[msg.sender], "Unauthorized bank"); require(id != bytes32(0) && commitment != bytes32(0), "Zero identifier or commitment"); require(!credentials[id].exists, "Duplicate credential ID"); require(expiry > block.timestamp, "Expiry must be future"); credentials[id] = Credential(id, commitment, msg.sender, uint64(block.timestamp), expiry, false, true); emit CredentialIssued(id, msg.sender, commitment, expiry); }
    function revokeCredential(bytes32 id) external { Credential storage c = credentials[id]; require(c.exists, "Not found"); require(msg.sender == c.issuingBank || msg.sender == administrator, "Issuer or administrator only"); require(!c.revoked, "Already revoked"); c.revoked = true; emit CredentialRevoked(id, msg.sender); }
    function getCredential(bytes32 id) external view returns(Credential memory) { return credentials[id]; }
    function isCredentialValid(bytes32 id) external view returns(bool) { Credential memory c = credentials[id]; return c.exists && !c.revoked && c.expiresAt > block.timestamp && authorizedBanks[c.issuingBank]; }
}
