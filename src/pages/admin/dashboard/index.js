/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useEffect, useState } from 'react'
import { parseToken } from 'src/utils/jwt'
import { useDispatch, useSelector } from 'react-redux'
import { loginPageActions, makeSelectLogin } from 'src/pages/pages/login/loginSlice'
import IncomOverview from 'src/views/dashboard/InComOverview'
import { dashboardActions, makeSelectDashBoard } from 'src/views/dashboard/dashboardSlice'
import Loading from 'src/components/Loading'
import { getApiDefault } from 'src/views/dashboard/api'

const Dashboard = () => {
  const [isLoadingCo, setIsLoadingCo] = useState(false)

  const loginSuccess = useSelector(makeSelectLogin)
  const getDataDashboard = useSelector(makeSelectDashBoard)
  const dataDashboard = getDataDashboard?.dataDashBoard
  const { isLoading } = getDataDashboard
  const { isSuccess, dataLogin } = loginSuccess
  const dataUser = loginSuccess?.dataUser
  const dispatch = useDispatch()

  useEffect(() => {
    if (dataLogin) {
      dispatch(loginPageActions.userInfo())
      dispatch(dashboardActions.getListDashBoard())
      handleGetUrlImage()
    }
  }, [dataLogin])

  const handleGetUrlImage = async () => {
    try {
      setIsLoadingCo(true)
      const url = `Document/File/${dataUser?.profilePictureId}`
      const res = await getApiDefault(url)
      console.log('reSSImage: ', res)
      if (res && res.status === 200) {
        setIsLoadingCo(false)
      }
    } catch (error) {
      setIsLoadingCo(false)

      // return handleShowSnackbar('Có lỗi trong quá trình thực hiện', 'warning')
    }
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {/* <Grid item xs={12} md={4}> */}
        {/* <Trophy /> */}
        {/* </Grid> */}
        <Grid item xs={12} md={12}>
          <StatisticsCard dataDashboard={dataDashboard} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <WeeklyOverview dataDashboard={dataDashboard} />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <IncomOverview dataDashboard={dataDashboard} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TotalEarning dataDashboard={dataDashboard} />
        </Grid>

        {/* <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid> */}
        {/* <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid> */}
      </Grid>
      <Loading isLoading={isLoading} />
    </ApexChartWrapper>
  )
}

export default Dashboard
