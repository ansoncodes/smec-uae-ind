---
source: "TAB 2 _ SMEC_Complete_Systems_Products_Responsive_Interactive.html (const pages)"
tab: "Tab 2 - Systems & Products"
title: "Generator Control & PMS"
display_title: "Generator Control & Power Management Systems"
slug: "/products/generator-control-pms"
seo_title: "Generator Control & Power Management Systems"
meta_description: "Synchronise generators, manage load sharing and respond to power disturbances with coordinated control."
keywords: "generator control panel, power management system PMS, generator synchronisation"
prose_chars: 5493
---

# Generator Control & Power Management Systems

Synchronise generators, manage load sharing and respond to power disturbances with coordinated control.

## Generator PMS That Manages the Transition, Not Just the Steady State _(hidden in prototype)_

Power management is tested when the load changes, a generator trips or the bus must recover. SMEC engineers generator controls around synchronisation, kW/kVAr sharing, load shedding, protection and operating sequences for isolated and grid-connected systems.

Power management is tested when the load changes, a generator trips or the bus must recover. The system is engineered to address generator controls around synchronisation, kW/kVAr sharing, load shedding, protection and operating sequences for isolated and grid-connected systems.


## How it works

**Synchronisation**

Voltage, frequency, phase-angle and breaker permissives govern synchronising and dead-bus closing.

**Load control**

Governor and AVR interfaces coordinate active/reactive load sharing, generator starts/stops and operating modes.

**Disturbance response**

Priority load shedding, bus transfer and blackout recovery logic should be verified against realistic failure cases.

**Diagnostics**

Event logs, breaker status, generator measurements and protection alarms support fault analysis.


## Key components

- Synchronising and breaker controls. The synchronising and breaker controls is selected for the equipment, operating duty and site conditions.
- Load sharing. Load measurement requires a verified mechanical load path, correctly sized sensor, signal conditioning and traceable calibration.
- Automatic start/stop. The automatic start/stop is selected for the equipment, operating duty and site conditions.
- Load shedding. Load measurement requires a verified mechanical load path, correctly sized sensor, signal conditioning and traceable calibration.
- Bus tie logic. The bus tie logic is selected for the equipment, operating duty and site conditions.
- Blackout recovery. The blackout recovery is selected for the equipment, operating duty and site conditions.
- Alarms. Alarm thresholds, priorities, delays and operator actions must be documented to avoid nuisance alarms and missed critical events.
- Generator and engine interfaces. The generator connection must accommodate voltage/frequency variation, transient load steps, breaker status and coordinated protection. Interface signals should be identified in the single-line diagram and I/O schedule.

## Technical specifications

_(empty in source)_

## Configurations & options

Project-engineered options can include the following, where technically appropriate and approved for the installation:

- Synchronisation: Voltage, frequency, phase-angle and breaker permissives govern synchronising and dead-bus closing.
- Load control: Governor and AVR interfaces coordinate active/reactive load sharing, generator starts/stops and operating modes.
- Disturbance response: Priority load shedding, bus transfer and blackout recovery logic should be verified against realistic failure cases.
- Diagnostics: Event logs, breaker status, generator measurements and protection alarms support fault analysis.

## Upgrades & retrofits

- Replace legacy synchronisers and PMS controllers while preserving verified protection.
- Add priority load-shedding and blackout recovery sequences.
- Integrate additional generators after load-sharing and fault studies.
Retrofit scope depends on existing OEM interfaces, component condition, available space, shutdown windows and the approval basis of any safety-related functions.


## Applications

- Drilling rigs
- Offshore platforms
- Marine vessels
- Captive power plants

## Testing & documentation

Relevant IEC, ISO, API, classification-society, hazardous-area or functional-safety requirements must be selected according to the specific system and installation. Where applicable, the project package may include electrical drawings, GA layouts, datasheets, I/O schedules, cause-and-effect, communication lists, inspection records, FAT/SAT procedures, calibration records and as-built documents. No unverified compliance certification is claimed here.


## FAQs

**Can an existing PMS be modernised without replacing generators?**

Often yes, subject to governor, AVR, breaker and protection compatibility.

**What is the difference between load sharing and load shedding?**

Load sharing distributes demand among online generators; load shedding disconnects selected loads when supply is insufficient.

**What data is needed?**

Generator ratings, SLD, breaker details, governor/AVR data and operating philosophy.


## Specifications table

| Specification | Technical description / design basis |
|---|---|
| Generator governor/AVR compatibility | The generator connection must accommodate voltage/frequency variation, transient load steps, breaker status and coordinated protection. Interface signals should be identified in the single-line diagram and I/O schedule. |
| Operating modes | Selected to match the connected equipment, operating duty and site conditions. |
| Protection coordination | Protection settings, trip contacts and fault discrimination must coordinate with upstream and downstream equipment and be demonstrated during testing. |
| Load-step study | Load measurement requires a verified mechanical load path, correctly sized sensor, signal conditioning and traceable calibration. |
| Dead-bus close | Selected to match the connected equipment, operating duty and site conditions. |
| Interlocks | Permissives and trips prevent unsafe sequencing, such as enabling a drive without cooling, lubrication, breaker readiness or the required machinery state. |
| Redundancy | Selected to match the connected equipment, operating duty and site conditions. |
| HMI and event logging | Selected to match the connected equipment, operating duty and site conditions. |
