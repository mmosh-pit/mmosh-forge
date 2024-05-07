"use client";
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { ArrowBackIos, ArrowDropDown, Search } from '@mui/icons-material';
import { Button, Form, Table } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { ShortNumber } from '@lytieuphong/short-number';
import { Bars } from 'react-loader-spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);


export default function ExploreDetail({ params }: { params: { bonding: string } }) {
  const navigate = useRouter();
  const [areaoptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  });
  const [arealabels, setArealabels] = useState(['2021', '2022', '2023', '2024']);
  const [areadatasets, setAreadatasets] = useState([
    {
      fill: true,
      data: [],
      borderColor: '#0047FF',
      backgroundColor: 'rgba(5, 77, 183, 0.5)',
    },
  ]) 
  const [areatotal, setAreaTotal] = useState<any>(0)
  const [dayVolume, setDayVolume] = useState<any>(0)
  const [monthVolume, setMonthVolume] = useState<any>(0)
  const [yearVolume, setYearVolume] = useState<any>(0)

  const [token, setToken] = useState(null)

  const[exploreLoading, setExploreLoading] = useState(true);

  const [page,setPage] = useState(0)
  const [history, setHistory] = useState([]);
  const [isPaging, setIsPaging] = useState(false)


  useEffect(()=>{
    initExploreDetail();
  },[])

  const initExploreDetail = async() => {
    setExploreLoading(true);
    await getTVL();
    await viewDirectory(0);
    setExploreLoading(false);
}

const getTVL = async() => {
    try {
        let tvlResult = await axios.get(`/api/tvl?bonding=`+params.bonding);
        let labels = [];
        let datas = []
        for (let index = 0; index < tvlResult.data.labels.length; index++) {
            const element = tvlResult.data.labels[index];
            labels.push(element.label)
            datas.push(Math.abs(element.value))
            
        }
        setAreaTotal(ShortNumber(Math.abs(tvlResult.data.total)))
        setArealabels(labels.reverse());
        setAreadatasets([
            {
              fill: true,
              data: datas.reverse(),
              borderColor: '#0047FF',
              backgroundColor: 'rgba(5, 77, 183, 0.5)',
            },
        ])
    } catch (error) {
       setAreaTotal(0)
    }
}

const viewDirectory = async(page:any) => {
try {
    setIsPaging(false)
    let url = '/api/view-directory?page='+page+'&&bonding='+params.bonding;

    let apiResult = await axios.get(url);

    if(apiResult.data.history.length > 0) {
        let newHistory = []
        for (let index = 0; index < apiResult.data.history.length; index++) {
            const element =  apiResult.data.history[index];
            newHistory.push(element);
        }
        setHistory(newHistory);
    }
    setDayVolume(ShortNumber(apiResult.data.day))
    setMonthVolume(ShortNumber(apiResult.data.month))
    setYearVolume(ShortNumber(apiResult.data.year))
    setToken(apiResult.data.token[0]);

    if(apiResult.data.history.length < 10) {
        setIsPaging(false)
    } else {
        setIsPaging(true)
    }
}  catch (error) {
    setHistory([])
}
}

const nextPage = () => {
    let currentPage = page + 1;
    setPage(currentPage);
    viewDirectory(currentPage);
 }
  
  return (
    <div className="invitation-page explore-page">
        {exploreLoading &&
            <Bars
                height="80"
                width="80"
                color="rgba(255, 0, 199, 1)"
                ariaLabel="bars-loading"
                wrapperStyle={{}} 
                wrapperClass="bars-loading"
                visible={true}
            />
        }
        {!exploreLoading &&
            <>
                <div className='container'>
                    <div className='create-coin-page-header'>
                        <div className="backAction" onClick={()=>{navigate.back()}}>
                            <ArrowBackIos /><span>Back</span>
                        </div>
                        {token != null &&
                            <div className='explore-detail-header-coin'>
                                <img src={token.image} alt='mmosh' />
                                <h2>{token.name} <span>{token.symbol}</span></h2>
                            </div>
                        }

                    </div>
                </div>

                <div className="explore-stats explore-stats-detail">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className='explore-graph-container'>
                                    <div className='explore-graph-container-header'>
                                        <div className='explore-graph-continer-header-left'>
                                            <h4>TVL</h4>
                                            <h2>{areatotal} MMOSH</h2>
                                        </div>
                                    </div>
                                    <Line options={areaoptions} data={{labels:arealabels,datasets: areadatasets}} />
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className='explore-bonding-container'>
                                    <h3>Stats</h3>
                                    <div className='explore-bonding-stats'>
                                        <div className='explore-boding-stat-item'>
                                            <p>TVL</p>
                                            <h4>{areatotal} <span>MMOSH</span></h4>
                                        </div>
                                        <div className='explore-boding-stat-item'>
                                            <p>1Day Volume</p>
                                            <h4>{dayVolume} <span>MMOSH</span></h4>
                                        </div>
                                        <div className='explore-boding-stat-item'>
                                            <p>1Month Volume</p>
                                            <h4>{monthVolume} <span>MMOSH</span></h4>
                                        </div>
                                        <div className='explore-boding-stat-item'>
                                            <p>1Year Volume</p>
                                            <h4>{yearVolume} <span>MMOSH</span></h4>
                                        </div>
                                    </div>
                                    <h3>Info</h3>
                                    <p className='explore-bonding-desc'>{token.desc}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                {history.length > 0 &&
                    <div className='explore-table-list explore-table-detail'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='explore-table-list-content'>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th>Time</th>
                                                <th>Type</th>
                                                <th>MMOSH</th>
                                                <th>For</th>
                                                <th>Wallet</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {history.map((historyItem: any, index: any) => (
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>11min ago</td>
                                                        <td>
                                                            <div className={historyItem.type == "sell" ? 'explore-table-list-content-percentage down' :  'explore-table-list-content-percentage up'}>
                                                                {historyItem.type}
                                                            </div>
                                                        </td>
                                                        <td>{historyItem.value} MMOSH</td>
                                                        <td>
                                                        <div className='explore-table-list-content-coin-main'>
                                                                <div className='explore-table-list-content-coin'>
                                                                    <h5>{historyItem.price}</h5>
                                                                    <img src={historyItem.targetimg} alt="mmosh" />
                                                                    <h5>{historyItem.targetsymbol}</h5>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                        {historyItem.wallet.substring(0,5)+"..."+historyItem.wallet.substring(historyItem.wallet.length-5)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className='explore-load-more'>
                                        {isPaging &&
                                            <Button variant="primary" size="lg" onClick={nextPage}>
                                                Load More
                                            </Button>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }

            </>
        }

    </div>
  );
} 
