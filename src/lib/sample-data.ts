import type { DetectionResult } from '@/types/detection';

export const SAMPLE_DETECTION: DetectionResult = {
  meta: {
    title: "Multiple Failed Logons Followed by Success",
    slug: "win-bruteforce-then-success",
    attack: ["T1110"],
    logsource: { 
      product: "windows", 
      service: "security" 
    }
  },
  sigma: `title: Multiple Failed Logons Followed by Success
id: win-bruteforce-then-success
status: experimental
description: Detects multiple failed logon attempts followed by a successful logon within a short timeframe
logsource:
  product: windows
  service: security
detection:
  sel_fail:
    EventID: 4625
  sel_success:
    EventID: 4624
  timeframe: 5m
  condition: sel_fail and sel_success
fields:
  - TargetUserName
  - IpAddress
  - WorkstationName
falsepositives:
  - Password audits
  - Legitimate user retries
level: medium
tags:
  - attack.credential_access
  - attack.T1110`,
  kql: `SecurityEvent
| where EventID in (4625, 4624)
| summarize 
    fails = countif(EventID == 4625), 
    succs = countif(EventID == 4624),
    first_fail = minif(TimeGenerated, EventID == 4625),
    first_succ = minif(TimeGenerated, EventID == 4624)
    by TargetUserName, IpAddress, bin(TimeGenerated, 5m)
| where fails >= 10 and succs >= 1
| where first_succ > first_fail
| project TimeGenerated, TargetUserName, IpAddress, fails, succs`,
  spl: `(index=security OR index=wineventlog) (EventCode=4625 OR EventCode=4624)
| bin _time span=5m
| stats 
    count(eval(EventCode=4625)) as fails,
    count(eval(EventCode=4624)) as succs,
    earliest(eval(if(EventCode=4625, _time, null()))) as first_fail,
    earliest(eval(if(EventCode=4624, _time, null()))) as first_succ
    by TargetUserName, IpAddress, _time
| where fails >= 10 AND succs >= 1 AND first_succ > first_fail
| table _time, TargetUserName, IpAddress, fails, succs`,
  tests: { 
    positive: [
      "10x EventID 4625 for user 'alice' from IP 10.1.2.3 followed by EventID 4624 for same user within 5 minutes",
      "15 failed logons then 1 success for admin account from external IP"
    ], 
    negative: [
      "Isolated EventID 4625 without any successful logon",
      "Single failed logon followed by success (below threshold)",
      "Multiple failures and success but outside 5-minute window"
    ] 
  },
  playbook: `# Incident Response Playbook: Credential Brute Force

## Initial Assessment
- **Severity**: Medium
- **MITRE ATT&CK**: T1110 (Brute Force)
- **Estimated Time**: 15-30 minutes

## Investigation Steps

### 1. Verify the Alert
- [ ] Confirm the failed/success logon pattern
- [ ] Check if the source IP is external
- [ ] Verify the targeted account is legitimate

### 2. Containment
- [ ] Check IP reputation in threat intelligence feeds
- [ ] Consider blocking the source IP if malicious
- [ ] Reset credentials for affected accounts if suspicious

### 3. Analysis
- [ ] Hunt for lateral movement within 30 minutes of successful logon
- [ ] Check for other accounts targeted from the same IP
- [ ] Review authentication logs for unusual patterns

### 4. Documentation
- [ ] Record timeline of events
- [ ] Note any indicators of compromise
- [ ] Update security monitoring rules if needed

## Recovery Actions
- [ ] Force password reset for compromised accounts
- [ ] Review and strengthen password policies
- [ ] Consider implementing account lockout policies`
};

export const EXAMPLES = {
  describe: "10+ failed RDP logins from same IP then a success within 5 minutes",
  logs: `EventID=4625 TargetUserName=alice IpAddress=10.1.2.3 LogonType=10
EventID=4625 TargetUserName=alice IpAddress=10.1.2.3 LogonType=10
EventID=4625 TargetUserName=alice IpAddress=10.1.2.3 LogonType=10
EventID=4624 TargetUserName=alice IpAddress=10.1.2.3 LogonType=10`
};