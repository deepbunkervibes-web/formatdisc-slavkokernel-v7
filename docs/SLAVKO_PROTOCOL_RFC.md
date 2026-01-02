# 📙 SLAVKO PROTOCOL — RFC‑1 (Canonical Interaction Standard)

## **1. Purpose**
Slavko Protocol definira **zakon komunikacije** unutar SlavkoShell OS‑a.  
To je jedini dopušteni format poruka, transakcija i interakcija.

## **2. Message Format**
Svaka poruka mora biti:
- deterministička  
- audit‑safe  
- bez implicitnih stanja  
- bez skrivenih side‑effecta  

### **2.1 Canonical Message Structure**
```
{
  id: <UUIDv7>,
  origin: <module>,
  intent: <operation>,
  payload: <structured data>,
  timestamp: <ISO-8601>,
  audit: {
    signature: <hash>,
    lineage: <array>
  }
}
```

## **3. Enforcement**

### **3.1 Zero‑Drift Enforcement**
Ako poruka odstupa od protokola:
- automatski se odbacuje  
- bilježi se audit event  
- modul se označava kao divergent  

### **3.2 Persona‑Safe Execution**
Protokol definira:
- izolaciju agenata  
- orkestraciju agenata  
- auditiranje agenata  
- dopuštene tokove  

### **3.3 Cross‑Layer Consistency**
Protokol je obvezan za:
- UI  
- Kernel  
- Simulator  
- Fusion  
- AI sloj  
