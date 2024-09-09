export const PLACEHOLDER_LINKS = () => {
  let objectId = 453;
  return Array.from({ length: 100 }, () => {
    const data = {
      id: objectId,
      favorite: false,
      url: 'https://www.apple.com',
      title: 'Apple',
      imageSource:
        'https://www.apple.com/ac/structured-data/images/open_graph_logo.png?202110180743',
      description:
        'Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, and expert device support.',
      createdAt: '2024-09-02T00:58:26.863Z',
    };
    objectId += 1;
    return data;
  });
};
