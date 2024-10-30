const ExoIrisLayout = async (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <div data-accent-color="iris-blue">{children}</div>;
};

export default ExoIrisLayout;
