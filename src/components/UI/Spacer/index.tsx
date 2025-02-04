interface ISpacer {
  height?: number;
  percentage?: number;
  minHeight?: number;
}

export default function Index({ height, percentage, minHeight }: ISpacer) {
  if (percentage) {
    return (
      <div
        style={{
          height: `${percentage}vh`,
          minHeight: `${minHeight}px`,
        }}
      />
    );
  }
  return <div style={{ height }} />;
}

Index.defaultProps = {
  height: 0,
  percentage: 0,
  minHeight: 0,
};
