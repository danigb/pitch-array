# A-Pitch

`A-pitch` is a format to represent music pitches and intervals in a simple and unified form with independence of the string representation.

The objective of this project is to create an exchangeable pitch and interval format for javascript libraries.

## Features

- Works equally for pitches and intervals
- It allows to represent tonal pitch classes (pitch without octaves)
- All numeric values, no need to parse
- Easy to understand for computers and humans

## Format description

The `A-pitch` is an array of 3 integers with the form `[num, alteration, octave]` with the following characteristics:

- __num__: must be a integer between 0 and 6. If the number is negative will be converted to positive. Values greater than 6 will be mod to 6 (7 and 0 is the same value)
- __alteration__: any integer. 0 means no alteration, negative numbers are for flats and positive for sharps. In theory there's no value limit, but most of the parsers set the aceptable values from -4 to +4
- __octave__: a integer to represent the octave. In pitches it's just the octave, but with intervals a negative octave means descendent interval.

### Encoding pitches

The way to represent pitches is quite straight forward. Some self-explanatory examples:

| Note in scientific notation | `A-pitch` representation |
|----|-----------|
| C2 | [0, 0, 2] |
| C#4 | [0, 1, 4] |
| Db4 | [1, -1, 4] |
| D4 | [1, 0, 4] |
| E5 | [2, 0, 5] |
| F#5 | [3, 1, 4] |
| G###5 | [4, 3, 4] |
| Bbbbb3 | [6, -4, 3] |
| ... | ... |

#### Pitch array description

The a-pitch array `[num, alteration, octave]` when representing pitches:

| Index | Name | Meaning | Possible values |
|----|----|----|----|
| 0 | num | The letter of the pitch with 0-based index | `0=C, 1=D, 2=E, ... 6=B` |
| 1 | alteration | The accidentals of the pitch | In theory any integer, in practice a value between -4 and +4 `..., -2='bb', -1='b', 0='', 1='#', 2='##', ...` |
| 2 | octave | the octave number | In theory any integer, in practice a value between 0 and 8. __Can be null__ |


#### Pitch class

Pitch classes (pitches without octaves) can be expressed by setting the octave to `null`

| Pitch class | `A-pitch` representation |
|-------------|--------------------------|
| C | [0, 0, null] |
| Db | [1, -1, null] |
| ... | ... |

### Encode intervals

Any interval can be represented with an `A-pitch` array almost the same way that pitches (in fact they have a direct equivalence) but there are some semantic meanings. Here are some examples:

| Interval | `A-pitch` representation |
|----|----|
| Perfect first (1P) | [0, 0, 0] |
| Augmented first (1A) | [0, 1, 0] |
| Major second (2M) | [1, 0, 0] |
| Minor second (2m) | [1, -1, 0] |
| Major ninth (9M) | [1, 0, 1] |
| Descending major second | [6, -1, -1] |

#### Interval array description

#### Descending intervals

The first number of the array must be always positive so descending intervals are encoded by inverting the interval and lowering an octave. For example, a descending major second is encoded as ascending minor seventh with an octave down: descending major second `[-2, 1, 0]`, inverted `[6, -1, 0]` with an octave lower `[6, -1, 0]`

In fact, __all descending intervals has an octave < 0__

### Pitch-interval equivalence

Any `A-pitch` value can represent indistinctly pitches or intervals. Here is the equivalence:

| `A-pitch` | Pitch | Interval |
|----|----|----|
| [0, 0, 0] | C0 | 1P (perfect first) |
| [1, 0, 0] | D0 | 2M (major second) |
| [4, -1, 0] | Gb0 | 4d (diminished fourth) |
| ... | ... | .... |

## License

MIT License
