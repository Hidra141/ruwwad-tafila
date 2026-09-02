# Graduate journey photographs

One folder per graduate, named with their slug. Inside it, one photograph per
phase, named with the phase id:

```
journey/
  karam-omar-al-haddar/
    foundation.webp
    digital-fluency.webp
    studio-green-circuit.webp
    studio-innovate-earth.webp
    fellowship.webp
```

Phase ids are the five in `src/data/alumni-stages.ts`:

| id | phase |
|---|---|
| `foundation` | المرحلة التأسيسية |
| `digital-fluency` | أساسيات الحاسوب والطلاقة الرقمية |
| `studio-green-circuit` | الاستوديو الأول — Green Circuit Studio |
| `studio-innovate-earth` | الاستوديو الثاني — Innovate for Earth |
| `fellowship` | الزمالة — تواصل مع قوتك |

`.webp`, `.jpg`, `.jpeg`, and `.png` are all picked up. Landscape crops sit
best in the frame.

No code change is needed: the page looks for these files when it builds, so
dropping one in and rebuilding is enough. Nothing is shown for a phase with no
photograph — a graduate with two photographs gets two, not five with gaps.
