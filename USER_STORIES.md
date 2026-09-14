# Ordovex — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Head of electronic trading

- As a head of electronic trading, I want every AI overlay certified before it can send live orders, so that research experiments cannot silently go hot.
- As a head of electronic trading, I want a one-click desk kill, so that a malfunctioning market-making algo does not force a venue disconnect first.

### Quant researcher

- As a quant, I want to submit a strategy version with simulation evidence and requested limits, so that risk review is structured rather than political.
- As a quant, I want clear reject reasons when certification fails, so that I can remediate without guessing.

### Market risk officer

- As a market risk officer, I want hierarchical limits that cannot be locally bypassed by the desk, so that firm appetite is real.
- As a market risk officer, I want automatic throttle when message rates or drawdowns breach, so that humans are not the first sensor.
- As a market risk officer, I want crowded-signal concentration views, so that correlated AI strategies do not look diversified.

### Market conduct / compliance

- As a conduct officer, I want an immutable timeline of kills and limit changes, so that we can reconstruct events for the exchange or regulator.
- As a conduct officer, I want alerts when a strategy’s behaviour diverges sharply from its certified envelope, so that we investigate spoofing or malfunction risk.

### Trading platform SRE

- As a platform SRE, I want kill and throttle APIs that are safe to call under load, so that incident response is automated in runbooks.
- As a platform SRE, I want health of control-plane latency as a first-class metric, so that Ordovex itself cannot become a silent failure.
