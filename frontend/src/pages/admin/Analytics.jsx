// import React from "react";

// import { motion } from "framer-motion";

// import {

//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,

//   PieChart,
//   Pie,
//   Cell,

//   LineChart,
//   Line

// } from "recharts";

// import "../../styles/analytics.css";

// function Analytics() {

//   // Event Registration Data

//   const registrationData = [

//     {
//       name: "Hackathon",
//       registrations: 80
//     },

//     {
//       name: "Cultural Fest",
//       registrations: 65
//     },

//     {
//       name: "AI Workshop",
//       registrations: 55
//     },

//     {
//       name: "Sports Meet",
//       registrations: 40
//     },

//     {
//       name: "Music Night",
//       registrations: 72
//     }

//   ];





//   // Pie Chart Data

//   const categoryData = [

//     {
//       name: "Technical",
//       value: 5
//     },

//     {
//       name: "Cultural",
//       value: 3
//     },

//     {
//       name: "Workshop",
//       value: 2
//     },

//     {
//       name: "Sports",
//       value: 2
//     }

//   ];





//   // Monthly Activity Data

//   const monthlyData = [

//     {
//       month: "Jan",
//       students: 30
//     },

//     {
//       month: "Feb",
//       students: 45
//     },

//     {
//       month: "Mar",
//       students: 60
//     },

//     {
//       month: "Apr",
//       students: 90
//     },

//     {
//       month: "May",
//       students: 120
//     }

//   ];





//   const COLORS = [

//     "#2563eb",

//     "#7c3aed",

//     "#14b8a6",

//     "#f59e0b"

//   ];





//   return (

//     <div className="analytics-page">

//       <h1>

//         Event Analytics Dashboard

//       </h1>





//       {/* Statistic Cards */}

//       <div className="analytics-cards">




//         <motion.div

//           className="analytics-card"

//           whileHover={{

//             scale: 1.05

//           }}

//         >

//           <h2>

//             12

//           </h2>

//           <p>

//             Total Events

//           </p>

//         </motion.div>





//         <motion.div

//           className="analytics-card"

//           whileHover={{

//             scale: 1.05

//           }}

//         >

//           <h2>

//             320

//           </h2>

//           <p>

//             Students

//           </p>

//         </motion.div>





//         <motion.div

//           className="analytics-card"

//           whileHover={{

//             scale: 1.05

//           }}

//         >

//           <h2>

//             150+

//           </h2>

//           <p>

//             Registrations

//           </p>

//         </motion.div>





//         <motion.div

//           className="analytics-card"

//           whileHover={{

//             scale: 1.05

//           }}

//         >

//           <h2>

//             8

//           </h2>

//           <p>

//             Upcoming Events

//           </p>

//         </motion.div>

//       </div>





//       {/* Charts Section */}

//       <div className="charts-container">




//         {/* Bar Chart */}

//         <motion.div

//           className="chart-box"

//           initial={{

//             opacity: 0,

//             x: -50

//           }}

//           animate={{

//             opacity: 1,

//             x: 0

//           }}

//           transition={{

//             duration: 0.6

//           }}

//         >

//           <h2>

//             Event Registrations

//           </h2>





//           <ResponsiveContainer

//             width="100%"

//             height={300}

//           >

//             <BarChart data={registrationData}>

//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="name" />

//               <YAxis />

//               <Tooltip />

//               <Bar

//                 dataKey="registrations"

//                 fill="#2563eb"

//               />

//             </BarChart>

//           </ResponsiveContainer>

//         </motion.div>





//         {/* Pie Chart */}

//         <motion.div

//           className="chart-box"

//           initial={{

//             opacity: 0,

//             x: 50

//           }}

//           animate={{

//             opacity: 1,

//             x: 0

//           }}

//           transition={{

//             duration: 0.6

//           }}

//         >

//           <h2>

//             Event Categories

//           </h2>





//           <ResponsiveContainer

//             width="100%"

//             height={300}

//           >

//             <PieChart>

//               <Pie

//                 data={categoryData}

//                 dataKey="value"

//                 cx="50%"

//                 cy="50%"

//                 outerRadius={100}

//                 label

//               >

//                 {categoryData.map(

//                   (entry, index) => (

//                     <Cell

//                       key={index}

//                       fill={

//                         COLORS[index % COLORS.length]

//                       }

//                     />

//                   )

//                 )}

//               </Pie>





//               <Tooltip />

//             </PieChart>

//           </ResponsiveContainer>

//         </motion.div>

//       </div>





//       {/* Line Chart */}

//       <motion.div

//         className="line-chart-box"

//         initial={{

//           opacity: 0,

//           y: 50

//         }}

//         animate={{

//           opacity: 1,

//           y: 0

//         }}

//         transition={{

//           duration: 0.6

//         }}

//       >

//         <h2>

//           Monthly Student Participation

//         </h2>





//         <ResponsiveContainer

//           width="100%"

//           height={350}

//         >

//           <LineChart data={monthlyData}>

//             <CartesianGrid strokeDasharray="3 3" />

//             <XAxis dataKey="month" />

//             <YAxis />

//             <Tooltip />





//             <Line

//               type="monotone"

//               dataKey="students"

//               stroke="#2563eb"

//               strokeWidth={3}

//             />

//           </LineChart>

//         </ResponsiveContainer>

//       </motion.div>

//     </div>

//   );

// }

// export default Analytics;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

import "../../styles/analytics.css";

function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://college-event-management-system-cem.vercel.app/api/admin/analytics",
        {
          headers: {
            Authorization: token
          }
        }
      );
       console.log("Analytics Response:", res.data);
      setAnalytics(res.data);

    } catch (err) {

      console.log(err);
    console.log(err.response?.data);

    }

  };

  const COLORS = [
    "#2563eb",
    "#7c3aed",
    "#14b8a6",
    "#f59e0b",
    "#ef4444",
    "#22c55e"
  ];

  if (!analytics) {
    return (
      <div className="analytics-page">
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  return (

    <div className="analytics-page">

      <h1>Event Analytics Dashboard</h1>

      {/* Stats Cards */}

      <div className="analytics-cards">

        <motion.div
          className="analytics-card"
          whileHover={{ scale: 1.05 }}
        >
          <h2>{analytics.totalEvents}</h2>
          <p>Total Events</p>
        </motion.div>

        <motion.div
          className="analytics-card"
          whileHover={{ scale: 1.05 }}
        >
          <h2>{analytics.totalStudents}</h2>
          <p>Students</p>
        </motion.div>

        <motion.div
          className="analytics-card"
          whileHover={{ scale: 1.05 }}
        >
          <h2>{analytics.totalFaculties}</h2>
          <p>Faculties</p>
        </motion.div>

        <motion.div
          className="analytics-card"
          whileHover={{ scale: 1.05 }}
        >
          <h2>{analytics.totalRegistrations}</h2>
          <p>Registrations</p>
        </motion.div>

        <motion.div
          className="analytics-card"
          whileHover={{ scale: 1.05 }}
        >
          <h2>{analytics.upcomingEvents}</h2>
          <p>Upcoming Events</p>
        </motion.div>

      </div>

      {/* Charts */}

      <div className="charts-container">

        {/* Registration Chart */}

        <motion.div
          className="chart-box"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >

          <h2>Event Registrations</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={analytics.registrationData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="registrations"
                fill="#2563eb"
              />

            </BarChart>

          </ResponsiveContainer>

        </motion.div>

        {/* Category Pie Chart */}

        <motion.div
          className="chart-box"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >

          <h2>Event Categories</h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={analytics.categoryData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >

                {analytics.categoryData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </motion.div>

      </div>

      {/* Monthly Participation */}

      <motion.div
        className="line-chart-box"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <h2>
          Monthly Student Participation
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={analytics.monthlyData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="students"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </motion.div>

    </div>

  );
}

export default Analytics;