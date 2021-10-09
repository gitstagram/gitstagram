import { nullish } from 'helpers/type/nullish'

type AssertExistsMsg =
  | {
      expected?: never
      inside?: never
    }
  | { expected: string; inside: string }

export function assertExists(
  variable: unknown,
  { expected, inside }: AssertExistsMsg = {}
): asserts variable {
  if (nullish(variable)) {
    const message = ''
    if (expected) message + `\`${expected}\` not found`
    if (inside) message + ` in \`${inside}\``
    throw new Error(message)
  }
}
