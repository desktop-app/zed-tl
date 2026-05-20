// Core types.
int ? = Int;

---types---

resPQ#05162463 nonce:int128 server_nonce:int128 pq:string = ResPQ;

message#abcdef flags:# id:int from_id:flags.0?long text:flags.1?string = Message;

help.configSimple#5a592a6c date:int rules:vector<AccessPointRule> = help.ConfigSimple;

---functions---

req_pq#60469778 nonce:int128 = ResPQ;
