import { AiFillHome } from "react-icons/ai";
import { DiGoogleAnalytics } from "react-icons/di";
import { ImUsers, ImUserMinus } from "react-icons/im";
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
      {
        name: "Total Votes",
        icon: <DiGoogleAnalytics />,
      },
      {
        name: "voters",
        icon: <ImUsers />,
      },
      {
        name: "nominees",
        icon: <HiOutlineUserGroup />,
      },
      {
        name: "ADCA Categories",
        icon: <ImUserMinus />,
      },
    ],
  },
];
