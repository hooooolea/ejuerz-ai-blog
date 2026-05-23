export type BtbuerSection = {
  id: string;
  label: string;
  desc: string;
  icon:
    | "trophy"
    | "folder"
    | "briefcase"
    | "book"
    | "alert"
    | "sparkle"
    | "paw";
};

export const BTBUER_SECTIONS: BtbuerSection[] = [
  {
    id: "jing-sai",
    label: "竞赛经验",
    desc: "比赛项目、参赛经验、获奖技巧",
    icon: "trophy",
  },
  {
    id: "ke-she",
    label: "课设项目",
    desc: "课程设计、大作业、学期项目",
    icon: "folder",
  },
  {
    id: "qiu-zhi",
    label: "求职实习",
    desc: "面试经验、实习心得、简历技巧",
    icon: "briefcase",
  },
  {
    id: "xue-xi-zi-liao",
    label: "学习资料",
    desc: "笔记、真题、课件，按课程整理",
    icon: "book",
  },
  {
    id: "cai-keng",
    label: "踩坑记录",
    desc: "避坑指南、错误排查、经验教训",
    icon: "alert",
  },
  {
    id: "hao-dong-xi",
    label: "好东西",
    desc: "音乐、游戏、美食，分享你喜欢的",
    icon: "sparkle",
  },
  {
    id: "campus-pets",
    label: "校园宠物",
    desc: "校园里的学长学姐们",
    icon: "paw",
  },
];

export const formatPostCount = (count: number) => {
  if (count >= 1000) {
    const value = count / 1000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}k 帖子`;
  }
  return `${count} 帖子`;
};
