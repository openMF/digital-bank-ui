export function resourcesToHash(resources: any[], identifier: string = 'identifier') {
  const hash = {};

  resources.forEach(resource => (hash[resource[identifier]] = resource));

  return hash;
}

export function idsToHashWithCurrentTimestamp(ids: string[]): { [id: string]: number } {
  const loadedAt = ids.reduce((entities: { [id: string]: number }, id: string) => {
    return Object.assign(entities, {
      [id]: Date.now(),
    });
  }, {});

  return loadedAt;
}
