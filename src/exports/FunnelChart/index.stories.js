import React from "react";
import Chart from "./index";

export default {
  title: "Test/倒金字塔",
  component: Chart,
};

const Template = (args) => <Chart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: [
    { name: "Create account", value: 444 },
    { name: "Complete profile", value: 111 },
    { name: "aaa", value: 44 },
    { name: "Start trial", value: 41 },
    { name: "Finish trial", value: 14 },
    { name: "Subscribe", value: 11 },
    { name: "Invitation", value: 5 },
  ],
  styles:{
    width: 800,
    height: 400
  }
};
