
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { selectUser } from 'src/routes/hooks/selectors';
import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const user = useAppSelector(selectUser);

  const data = {
    "groupedData": [
      {
        "_id": {
          "year": 2023,
          "month": 12
        },
        "total": 2,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 2
        },
        "total": 183,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 3
        },
        "total": 13,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 4
        },
        "total": 21,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 5
        },
        "total": 25,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 6
        },
        "total": 7,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 7
        },
        "total": 6,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 8
        },
        "total": 113,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 9
        },
        "total": 89,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 10
        },
        "total": 163,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 11
        },
        "total": 73,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2024,
          "month": 12
        },
        "total": 68,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2025,
          "month": 1
        },
        "total": 39,
        "users": [
          "65a1c6d5fc3ed628b199b4a5"
        ]
      },
      {
        "_id": {
          "year": 2025,
          "month": 2
        },
        "total": 53,
        "users": [
          "65739e40e8c0935ec34d97a2",
          "65a1c6d5fc3ed628b199b4a5"
        ]
      }
    ],
    "totalMonthlyVisits": 1,
    "diff_percent": 135.8974358974359
  };
  const series = data.groupedData.map((serie) => serie.total);
  const categories = data.groupedData.map((category) => `${category._id.month}/${category._id.year}`);
  const token = useAppSelector((state) => state.auth.token);
  const [dataGraf, setDataGraf] = useState(data);
  const [dataGrafLogin, setDataGrafLogin] = useState(data);
  const url = CONFIG.urlNotifications;
  const fetchData = () => {
    fetch(`${url}/notifications/visits`,{
      method: "GET",
      headers: { Authorization : `Bearer ${token}`}
    }).then(async res => {
      const response = await res.json();
      console.log("response-graf",response);

      setDataGraf(response);
    })
  }
  const fetchDataLogin = () => {
    fetch(`${url}/notifications/logins`,{
      method: "GET",
      headers: { Authorization : `Bearer ${token}`}
    }).then(async res => {
      const response = await res.json();
      console.log("response-graf-login",response);

      setDataGrafLogin(response);
    })
  }
  useEffect(() => {
    if(dataGraf.totalMonthlyVisits === 1)
      fetchData();
    if(dataGrafLogin.totalMonthlyVisits === 1)
      fetchDataLogin();

  })

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi {user?.username}, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          {!dataGraf ? <AnalyticsWidgetSummary
            title="Monthly visits"
            percent={data.diff_percent < 100 ? (-data.diff_percent) : data.diff_percent - 100}
            total={data.totalMonthlyVisits}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories,
              series,
            }}
          />:
          <AnalyticsWidgetSummary
            title="Monthly visits"
            percent={dataGraf.diff_percent < 100 ? (-dataGraf.diff_percent) : dataGraf.diff_percent - 100}
            total={dataGraf.totalMonthlyVisits}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: dataGraf.groupedData.map((category) => `${category._id.month}/${category._id.year}`),
              series: dataGraf.groupedData.map((serie) => serie.total),
            }}
          />
          }
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          {dataGrafLogin && <AnalyticsWidgetSummary
            title="Users login"
            percent={dataGrafLogin.diff_percent < 100 ? (-dataGrafLogin.diff_percent) : dataGrafLogin.diff_percent - 100}
            total={dataGrafLogin.totalMonthlyVisits}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: dataGrafLogin.groupedData.map((category) => `${category._id.month}/${category._id.year}`),
              series: dataGrafLogin.groupedData.map((serie) => serie.total),
            }}
          />}
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Purchase orders"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Messages"
            percent={3.6}
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Current visits"
            chart={{
              series: [
                { label: 'America', value: 3500 },
                { label: 'Asia', value: 2500 },
                { label: 'Europe', value: 1500 },
                { label: 'Africa', value: 500 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite
            title="Traffic by site"
            list={[
              { value: 'facebook', label: 'Facebook', total: 323234 },
              { value: 'google', label: 'Google', total: 341212 },
              { value: 'linkedin', label: 'Linkedin', total: 411213 },
              { value: 'twitter', label: 'Twitter', total: 443232 },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
