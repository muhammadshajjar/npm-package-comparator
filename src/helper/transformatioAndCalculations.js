export const transformApiResponse = (packageResponse) => {
  const metadata = packageResponse.collected.metadata || {};

  console.log(packageResponse);

  return {
    name: metadata.name,
    description: metadata.description,
    version: metadata.version,
    license: metadata.license,
    links: metadata.links,
    keywords: metadata.keywords,
    author: metadata.author,
    maintainers: metadata.maintainers,
    downloads: transformDownloadsData(
      packageResponse.collected.npm.downloads,
      metadata.name
    ),
    starsCount: packageResponse.collected.github.starsCount,
    health: packageResponse.evaluation.quality.health,
    communityInterest: packageResponse.evaluation.popularity.communityInterest,
    carefullness: packageResponse.evaluation.quality.carefulness,
    test: packageResponse.evaluation.quality.tests,
    downloadsCount: packageResponse.evaluation.popularity.downloadsCount,
  };
};

export const extractAllDownloads = (comparators) => {
  const allDownloads = comparators.reduce(
    (acc, obj) => acc.concat(obj.downloads),
    []
  );

  return allDownloads;
};
const dummyDates = [
  "2021-05-11",
  "2021-08-05",
  "2021-11-13",
  "2022-02-12",
  "2022-05-12",
  "2022-05-11",
];

const transformDownloadsData = (downloads, name) => {
  return downloads.map((item, index) => {
    return {
      from: dummyDates[index],
      count: item.count,
      name,
    };
  });
};

export const calculateRecommendationScore = (pkg) => {
  console.log(pkg);
  const communityInterestWeight = 0.2;
  const downloadsWeight = 0.5;
  const testsAndCarefulnessWeight = 0.3;

  const communityInterestScore =
    pkg.communityInterest * communityInterestWeight;
  const downloadsScore = pkg.downloadsCount * downloadsWeight;
  const testsAndCarefulnessScore =
    (pkg.carefullness + pkg.test) * testsAndCarefulnessWeight;

  return communityInterestScore + downloadsScore + testsAndCarefulnessScore;
};

export const recommendPackage = (pkg1, pkg2) => {
  const score1 = calculateRecommendationScore(pkg1);
  const score2 = calculateRecommendationScore(pkg2);
  const timesBetter1 = Math.round((score1 / score2) * 100) / 100;
  const timesBetter2 = Math.round((score2 / score1) * 100) / 100;
  return {
    recommended: score1 >= score2 ? pkg1 : pkg2,
    timesBetter: timesBetter1 >= timesBetter2 ? timesBetter1 : timesBetter2,
  };
};
