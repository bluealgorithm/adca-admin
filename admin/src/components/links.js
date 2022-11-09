import { AiFillHome } from "react-icons/ai";
import { DiGoogleAnalytics } from "react-icons/di";
import { ImUsers } from "react-icons/im";
import { BiCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
export const links = [
  {
    title: "Overview",
    links: [
      {
        name: "overview",
        icon: <AiFillHome />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      // {
      //   name: "Total Votes",
      //   icon: <DiGoogleAnalytics />,
      // },
      {
        name: "total-votes",
        icon: <ImUsers />,
      },
      {
        name: "nominees",
        icon: <HiOutlineUserGroup />,
      },
      {
        name: "candidates",
        icon: <HiOutlineUserGroup />,
      },
      {
        name: "categories",
        icon: <MdCategory />,
      },
      {
        name: "create-categories",
        icon: <BiCategoryAlt />,
      },
      {
        name: "create-sub-categories",
        icon: <BiCategoryAlt />,
      },
      {
        name: "set-event-info",
        icon: <BiCategoryAlt />,
      },
    ],
  },
];
