export type Tag = {
  value: string
  count: number
}

export const getUniqueTags = (tags: string[][]): Tag[] =>
  Array.from(
    tags
      .reduce((all, current) => all.concat(current), [])
      .reduce((acc, tag) => {
        const count = acc.get(tag) || 0
        acc.set(tag, count + 1)
        return acc
      }, new Map<string, number>())
      .entries()
  ).map(([value, count]) => ({
    value,
    count,
  }))
