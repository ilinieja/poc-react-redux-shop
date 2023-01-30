interface Props {
  [key: string]: any;
}

export function extractDataAttributes(props: Props) {
  return Object.keys(props).reduce((acc, key) => {
    if (key.startsWith("data-")) {
      acc[key] = props[key];
    }

    return acc;
  }, {} as Props);
}
