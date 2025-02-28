
import { useState, useEffect } from 'react';

import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { selectUser } from 'src/routes/hooks/selectors';
import { useAppSelector } from 'src/routes/hooks/hookes';

import { CONFIG } from 'src/config-global';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

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
        totalEngajamento: 234,
        likes: 123,
        comments: 111,
        "users": [
          "65739e40e8c0935ec34d97a2",
          "65a1c6d5fc3ed628b199b4a5"
        ]
      }
    ],
    "totalMonthlyVisits": 1,
    totalMonthlyPost: 1,
    "diff_percent": 135.8974358974359
  };
  const series = data.groupedData.map((serie) => serie.total);
  const categories = data.groupedData.map((category) => `${category._id.month}/${category._id.year}`);
  const token = useAppSelector((state) => state.auth.token);
  const [dataGraf, setDataGraf] = useState(data);
  const [dataGrafLogin, setDataGrafLogin] = useState(data);
  const [dataGrafPost, setDataGrafPost] = useState(data);
  const [isLoading, setLoading] = useState(true);
  const url = CONFIG.urlNotifications;

  const fetchDataGraphs = () => {
    fetch(`${url}/notifications/graphs`,{
      method: "GET",
      headers: { Authorization : `Bearer ${token}`}
    }).then(async res => {
      const response = await res.json();
      setDataGrafPost(response[0]);
      setDataGrafLogin(response[1]);
      setDataGraf(response[2]);
      setLoading(false)
    })
  }
  useEffect(() => {
    if(dataGrafLogin.totalMonthlyVisits === 1)
      fetchDataGraphs();

  })
  function diferencaPercentual(arr: number[]) {
    if (arr.length < 2) return null; // Garante que há pelo menos dois valores

    const novo = arr[arr.length - 1];   // Último valor
    const antigo = arr[arr.length - 2]; // Penúltimo valor

    if (antigo === 0) return null; // Evita divisão por zero

    const diferenca = ((novo - antigo) / antigo) * 100;
    return `${diferenca.toFixed(2)  }%`; // Formata com 2 casas decimais
}
  const interationPercent = () => {
    const percent = diferencaPercentual(dataGrafPost.groupedData.map((serie) => serie.totalEngajamento || 0));
    return percent ? parseFloat(percent) : 0;
  }
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi {user?.username}, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
        {isLoading ? <Skeleton width="100%" height="235px" />:
          <AnalyticsWidgetSummary
            title="Monthly Visits"
            percent={dataGraf.diff_percent < 100 ? (-dataGraf.diff_percent) : dataGraf.diff_percent - 100}
            total={dataGraf.totalMonthlyVisits}
            icon={<Iconify icon="solar:eye-bold-duotone" width={64} />}
            chart={{
              categories: dataGraf.groupedData.map((category) => `${category._id.month}/${category._id.year}`),
              series: dataGraf.groupedData.map((serie) => serie.total),
            }}
          />
          }
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          {isLoading ? <Skeleton width="100%" height="100%" /> : <AnalyticsWidgetSummary
            title="Monthly Users login"
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
        {isLoading ? <Skeleton width="100%" height="100%" /> : <AnalyticsWidgetSummary
            title="Monthly Posts"
            percent={dataGrafPost.diff_percent < 100 ? (-dataGrafPost.diff_percent) : dataGrafPost.diff_percent - 100}
            total={dataGrafPost.totalMonthlyPost}
            color="warning"
            icon={<Iconify icon="solar:notes-bold" width={64} />}
            chart={{
              categories: dataGrafPost.groupedData.map((category) => `${category._id.month}/${category._id.year}`),
              series: dataGrafPost.groupedData.map((serie) => serie.total),
            }}
          /> }
        </Grid>

        <Grid xs={12} sm={6} md={3}>
        {isLoading ? <Skeleton width="100%" height="100%" /> : <AnalyticsWidgetSummary
            title="Monthly Interactions"
            percent={interationPercent()}
            total={Number(dataGrafPost.groupedData[dataGrafPost.groupedData.length - 1].totalEngajamento)}
            color="error"
            icon={<Iconify icon="solar:like-bold" width={64} />}
            chart={{
              categories: dataGrafPost.groupedData.map((category) => `${category._id.month}/${category._id.year}`),
              series: dataGrafPost.groupedData.map((serie) => serie.totalEngajamento || 0),
            }}
          />}
        </Grid>

        <Grid xs={12} md={6} lg={4}>
        {isLoading ? <Skeleton width="100%" height="100%" /> : <AnalyticsCurrentVisits
            title="Current visits"
            chart={{
              series: [
                { label: 'America', value: 3500 },
                { label: 'Asia', value: 2500 },
                { label: 'Europe', value: 1500 },
                { label: 'Africa', value: 500 },
              ],
            }}
          /> }
        </Grid>
        <Grid xs={12} md={6} lg={8}>
        {isLoading ? <Skeleton width="100%" height="335px" /> : <AnalyticsWebsiteVisits
            title="Interactions"
            subheader={`${dataGrafPost.groupedData
              .map((serie) => serie.totalEngajamento || 0)
              .reduce((total, num) => total + num, 0)
              .toFixed(0)
            } interations than last year`}
            chart={{
              categories: dataGrafPost.groupedData.map((category) => `${category._id.month}/${category._id.year}`),
              series: [
                { name: 'Likes', data: dataGrafPost.groupedData.map((serie) => serie.likes || 0) },
                { name: 'Comments', data: dataGrafPost.groupedData.map((serie) => serie.comments || 0) },
              ],
            }}
          /> }
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
