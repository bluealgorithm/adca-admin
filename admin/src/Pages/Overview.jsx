import React, { useState, useEffect } from "react";
import { DiGoogleAnalytics } from "react-icons/di";
import { ImUsers } from "react-icons/im";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import Animation from "../components/Animation";
import { url } from "../url";

const Card = ({ icon, figure, title, middle, style }) => (
  <div
    className={`${
      middle && "my-[20px] md:my-0"
    } box w-300 md:w-[400px] h-[150px] flex flex-col justify-center text-white items-center dark:border dark:border-gray-200 card`}
    style={{
      backgroundImage: `${style}`,
    }}
  >
    <div className="flex gap-[18px]">
      {icon} <span className="text-[24px] font-[400]">{title}</span>
    </div>
    <p className="font-[700] text-[24px]">{figure}</p>
  </div>
);
const Overview = () => {
  const [nominees, setNominees] = useState("");
  const [categories, setCategories] = useState("");
  const [candidates, setCandidates] = useState("second");
  const [info, setInfo] = useState([]);
  const fetchSubCategories = async () => {
    const response = await fetch(`${url}/categories`);
    const data = await response.json();
    setCategories(data.length);
    // console.log(data.length);
  };

  useEffect(() => {
    fetchSubCategories();
    return () => {
      fetchSubCategories();
    };
  }, []);

  const fetchNominees = async () => {
    const response = await fetch(`${url}/nominations`);
    const data = await response.json();
    setNominees(data.length);
    // console.log(data.length);
  };
  useEffect(() => {
    fetchNominees();
    return () => {
      fetchNominees();
    };
  }, []);
  const fetchCandidate = async () => {
    const response = await fetch(`${url}/vote/candidates`);
    const data = await response.json();
    setCandidates(data.length);
  };
  useEffect(() => {
    fetchCandidate();
    return () => {
      fetchCandidate();
    };
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${url}/vote/candidates`);
    const data = await response.json();
    setInfo(data);
  };
  let totalVotes = info.map((vote) => vote.votes);
  totalVotes = totalVotes.reduce((partialSum, a) => partialSum + a, 0);
  // console.log(totalVotes);

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, []);
  return (
    <div className="dark:text-gray-200 dark:bg-main-dark-bg dark:hover:text-white h-screen">
      <Animation>
        <div className="md:p-[40px] md:flex md:flex-wrap md:flex-row items-center md:justify-space-between md:gap-[30px] py-[80px] md:py-[40px] w-4/5 mx-auto">
          <Link to="/total-votes">
            <Card
              icon={<DiGoogleAnalytics size={32} />}
              figure={totalVotes}
              title="Total Votes"
              style="linear-gradient(to left bottom, #070537, #004188, #007dae, #00b88c, #14eb12)"
            />
          </Link>
          <Link to="/nominees">
            <Card
              icon={<ImUsers size={32} />}
              figure={nominees}
              middle
              title="Nominees"
              style="linear-gradient(to left bottom, #300537, #3f2a64, #445093, #3a77c1, #12a1eb)"
            />
          </Link>
          <Link to="/categories">
            <Card
              icon={<HiOutlineUserGroup size={32} />}
              figure={categories}
              title="Categories"
              style="linear-gradient(to left bottom, #070537, #004188, #007dae, #00b88c, #14eb12)"
            />
          </Link>
          <Link to="/candidates">
            <Card
              icon={<HiOutlineUserGroup size={32} />}
              figure={candidates}
              title="Approved Candidates"
              style="linear-gradient(to left bottom, #300537, #3f2a64, #445093, #3a77c1, #12a1eb)"
            />
          </Link>
        </div>
      </Animation>
    </div>
  );
};

export default Overview;
