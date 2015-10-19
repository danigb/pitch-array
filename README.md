# Pitch array notation

`pitch-array` is a format to represent music pitches and intervals in a simple and unified way. The aim of this project is to create an exchangeable pitch and interval format and allow music libraries to work regardless of the string representations and with no need to parse.

## Features

- Works equally for pitches and intervals
- It allows to represent tonal pitch classes (pitch without octaves)
- All numeric values, no need to parse
- Easy to understand for computers and humans

## Format description

The `pitch-array` is an array of 3 integers with the form `[num, alteration, octave]` with the following characteristics:

- __num__: must be a integer between 0 and 6. If the number is negative will be converted to positive (-1 is 6, -2 is 5, ...). Values greater than 6 will be mod to 6 (7 and 0 is the same value). __Required.__
- __alteration__: any integer. 0 means no alteration, negative numbers are for flats and positive for sharps. In theory there's no value limit, but most of the parsers set the aceptable values from -4 to +4. __Required.__
- __octave__: a integer to represent the octave. In pitches it's just the octave, but with intervals a negative octave means descendent interval. __Optional, can be `null`.__ `null` for pitches is used to represent pitch classes (pitch without octaves). For intervals, 0 and null are same value.

### Encoding pitches

The way to represent pitches is quite straight forward. Some self-explanatory examples:

| Note in scientific notation | `pitch-array` notation |
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

| Pitch class | `pitch-array` notation |
|-------------|--------------------------|
| C | [0, 0, null] |
| Db | [1, -1, null] |
| ... | ... |

### Encoding intervals

Any interval can be represented with an `pitch-array` array almost the same way that pitches (in fact they have a direct equivalence) but there are some semantic differences. Here are some examples:

| Interval | `pitch-array` notation |
|----|----|
| Perfect unison (1P) | [0, 0, 0] |
| Augmented unison (1A) | [0, 1, 0] |
| Major second (2M) | [1, 0, 0] |
| Augmented second (2A) | [1, 1, 0] |
| Minor second (2m) | [1, -1, 0] |
| Major ninth (9M) | [1, 0, 1] |
| Descending major second | [6, -1, -1] |

#### Interval array description

The a-pitch array `[num, alteration, octave]` when representing intervals:

| Index | Name | Meaning | Possible values |
|----|----|----|----|
| 0 | num | The simplified interval number using a 0-based index | `0=unison, 1=second, ... 6=seventh` |
| 1 | alteration | The alteration of the interval compared to the natural form | 0=perfect or major. |
| 2 | octave | the number of octaves the interval spawns | 0 means simple intervals. > 0 means compound intervals. < 0 means descending intervals |


#### Descending intervals

The first number of the `pitch-array` array must be always positive so descending intervals are encoded by inverting the interval and lowering an octave. For example, a descending major second is encoded as ascending minor seventh with an octave down: descending major second `[-2, 1, 0]`, inverted `[6, -1, 0]` with an octave lower `[6, -1, -1]`

In fact, __all descending intervals has an octave < 0__

### Pitch-interval equivalence

Any `pitch-array` value can represent indistinctly pitches or intervals. Here is the equivalence:

| `pitch-array` | Pitch | Interval |
|----|----|----|
| [0, 0, 0] | C0 | 1P (perfect unison) |
| [1, 0, 0] | D0 | 2M (major second) |
| [4, -1, 0] | Gb0 | 4d (diminished fourth) |
| ... | ... | .... |

## Libraries

Convert to string to a-pitch:

- [pitch-parser](https://github.com/danigb/pitch-parser): convert from pitch scientific notation to a-pitch (and the opposite)
- [interval-parser](https://github.com/danigb/interval-parser): convert from interval strings to a-pitch (and the opposite)

Other libraries using this format:

- [tonal](https://github.com/danigb/tonal)

## License

MIT License
