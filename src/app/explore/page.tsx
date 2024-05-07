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
import { ArrowDropDown, ArrowDropUp, Search } from '@mui/icons-material';
import { Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import {ShortNumber} from '@lytieuphong/short-number';
import { useRouter } from "next/navigation";


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

let source;

export default function Explore() {
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
    scales: {
        y: {
           ticks: {
              display: false
           }
        }
     }
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
  
  const [volumneoptions] = useState({
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
    scales: {
        y: {
           ticks: {
              display: false
           }
        }
     }
  });
  const [volumnelabels, setVolumnelabels] = useState(['Apr 25', 'Apr 26', 'Apr 27', 'Apr 28', 'Apr 29', 'Apr 30', 'May 1','Apr 25', 'Apr 26', 'Apr 27', 'Apr 28', 'Apr 29', 'Apr 30', 'May 1']);
  const [volumnedatasets, setVolumnedatasets] = useState([
    {
        data: [],
        backgroundColor: '#5E15C4',
    },
  ])
  const [volumetotal, setVolumeTotal] = useState<any>(0)
  const [volumeType, setVolumeType] = useState([
    {value: "day",label: "D", isSelected:true},
    {value: "month",label: "M", isSelected:false},
    {value: "year",label: "Y", isSelected:false}
  ])


  const [swapoptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  });
  const [swaplabels, setSwaplabels] = useState(['Apr 25', 'Apr 26', 'Apr 27', 'Apr 28', 'Apr 29', 'Apr 30', 'May 1','Apr 25', 'Apr 26', 'Apr 27', 'Apr 28', 'Apr 29', 'Apr 30', 'May 1']);
  const [swapdatasets, setSwapdatasets] = useState([
    {
      label: 'Buy',
      data: [],
      backgroundColor: '#5E15C4',
    },
    {
      label: 'Sell',
      data: [],
      backgroundColor: 'rgba(205, 6, 142, 1)',
    },
  ])

  const [buyTotal, setBuyTotal] = useState<any>(0)
  const [sellTotal, setSellTotal] = useState<any>(0)


  const [page,setPage] = useState(0)
  const [coins, setCoins] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [isPaging, setIsPaging] = useState(false)
  const [coinVolumeType, setCoinVolumeType] = useState("hour")

  const[exploreLoading, setExploreLoading] = useState(true);

  const [tableoptions] = useState({
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
    scales: {
        y: {
           grid: {
             lineWidth: 0,
             display: false
           },
           border:{
            display:false
          },
           ticks: {
              display: false
           }
        },
        x: {
            border:{
                display:false
            },
            grid: {
                lineWidth: 0,
                display: false
            },
            ticks: {
               display: false
            }
         }
     }
  });

  const navigate = useRouter();

  useEffect(()=>{
     initExplore();
  },[])

  const initExplore = async() => {
      setExploreLoading(true);
      await getTVL();
      await getVolume("day");
      await getBuySell();
      await listDirectory('day', '', 0);
      setExploreLoading(false);
  }


  const getTVL = async() => {
    try {
        let tvlResult = await axios.get(`/api/tvl`);
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

  const getVolume = async(type:any) => {
    try {
        let tvlResult = await axios.get(`/api/volume?type=`+type);
        let labels = [];
        let datas = []
        for (let index = 0; index < tvlResult.data.labels.length; index++) {
            const element = tvlResult.data.labels[index];
            labels.push(element.label)
            datas.push(Math.abs(element.value))
            
        }
        setVolumeTotal(ShortNumber(Math.abs(tvlResult.data.total)))
        setVolumnelabels(labels.reverse());
        setVolumnedatasets([
            {
                data: datas.reverse(),
                backgroundColor: '#5E15C4',
            },
          ])
    } catch (error) {
        setVolumeTotal(0)
    }
  }

  const getBuySell = async() => {
    try {
        let tvlResult = await axios.get(`/api/sellbuy`);
        let labels = [];
        let selldatas = []
        let buydatas = []
        for (let index = 0; index < tvlResult.data.buylabels.length; index++) {
            const element = tvlResult.data.buylabels[index];
            labels.push(element.label)
            buydatas.push(Math.abs(element.value))
        }

        for (let index = 0; index < tvlResult.data.selllabels.length; index++) {
            const element = tvlResult.data.selllabels[index];
            selldatas.push(Math.abs(element.value))
        }
        setBuyTotal(ShortNumber(tvlResult.data.totalbuy))

        setSellTotal(ShortNumber(Math.abs(tvlResult.data.totalsell)))
        setSwaplabels(labels.reverse());
        setSwapdatasets([
            {
                label: 'Buy',
                data: buydatas.reverse(),
                backgroundColor: '#5E15C4',
            },
            {
                label: 'Sell',
                data: selldatas.reverse(),
                backgroundColor: 'rgba(205, 6, 142, 1)',
            },
         ])
    } catch (error) {
        setBuyTotal(0)
        setSellTotal(0)
    }
  }

  const listDirectory = async(volume:any, keyword:any, page:any) => {
    try {
        setIsPaging(false)
        if(source) {
            source.cancel();
            source = null
        }
        source = axios.CancelToken.source();
        let url = '/api/list-directory?page='+page;
        if(volume != "") {
            url = url + "&&volume="+volume;
        } 
        if(keyword != "") {
            url = url + "&&keyword="+keyword;
        } 
        let apiResult = await axios.get(url,{
            cancelToken: source.token
        });
  
        let newCoins = []
        for (let index = 0; index < apiResult.data.length; index++) {
            const element = apiResult.data[index];
            let labels = [];
            let datas = []
            for (let index = 0; index < element.price_last_seven_days.length; index++) {
                const elementchart = element.price_last_seven_days[index];
                labels.push(elementchart.label);
                datas.push(elementchart.value)
            }
            element.graph = {
                labels,
                datas:[
                    {
                        fill: true,
                        data: datas,
                        borderColor: '#0047FF',
                        backgroundColor: 'transparent',
                    },
                ]
            }
            console.log(element)
            newCoins.push(element);
        }
        setCoins(newCoins);
        if(apiResult.data.length < 10) {
          setIsPaging(false)
        } else {
          setIsPaging(true)
        }
    }  catch (error) {
        setCoins([])
    }
  }

  const searchExplore = (searchKeyword:any) => {
    setKeyword(searchKeyword);
    setPage(0)
    listDirectory(coinVolumeType,searchKeyword,0);
}

  const nextPage = () => {
     let currentPage = page + 1;
     setPage(currentPage);
     listDirectory(coinVolumeType,keyword,currentPage);
  }

  const onSelectChange = (event) => {
    setCoinVolumeType(event.target.value)
    setPage(0)
    listDirectory(event.target.value,keyword,0);

  }

  

  const volumeChangeAction = async(item:any) => {
     let newVolumeTypes = [];
     for (let index = 0; index < volumeType.length; index++) {
        const element = volumeType[index];
        element.isSelected = item.value == element.value ? true: false;
        newVolumeTypes.push(element);
     }
     setVolumeType(newVolumeTypes)
     await getVolume(item.value);
  }

  const navigateDetail = (coinItem:any) => {
     navigate.push("/explore/"+coinItem.bonding);
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
                <div className="explore-stats">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
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
                            <div className="col-md-4">
                            <div className='explore-graph-container'>
                                    <div className='explore-graph-container-header'>
                                        <div className='explore-graph-continer-header-left'>
                                            <h4>Total Volume</h4>
                                            <h2>{volumetotal} MMOSH</h2>
                                        </div>
                                        <div className='explore-graph-container-header-right'>
                                            <div className='explore-graph-container-header-filter'>
                                                <ul>
                                                    {volumeType.map((volumeTypeItem: any, index: any) => (
                                                        <li className={volumeTypeItem.isSelected ? 'active' : ''} onClick={()=>{volumeChangeAction(volumeTypeItem)}}>{volumeTypeItem.label}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <Bar options={volumneoptions} data={{labels:volumnelabels, datasets:volumnedatasets}} />
                                </div>
                            </div>
                            <div className="col-md-4">
                            <div className='explore-graph-container'>
                            <div className='explore-graph-container-header'>
                                        <div className='explore-graph-continer-header-left'>
                                            <h4>Sell {sellTotal} MMOSH</h4>
                                            <h4>Buy {buyTotal} MMOSH</h4>
                                        </div>
                                    </div>
                                    <Bar options={swapoptions} data={{labels:swaplabels,datasets:swapdatasets}} />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='explore-table-list'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='explore-table-list-header'>
                                    <div></div>
                                    <div className='explore-table-list-search'>
                                        <div className='explore-table-list-search-action'>
                                            <span><Search /></span>
                                            <label>Search</label>
                                        </div>
                                        <Form.Control
                                                type="text"
                                                placeholder="Type your search terms"
                                                maxLength={32}
                                                onChange={(event) => searchExplore(event.target.value)}
                                        />
                                    </div>
                                    <div className='explore-table-list-filter'>
                                        <Form.Select onChange={e => {onSelectChange(e)}}>
                                            <option value="hour">1H Volume</option>
                                            <option value="day">1D Volume</option>
                                            <option value="week">1W Volume</option>
                                            <option value="month">1M Volume</option>
                                            <option value="year">1Y Volume</option>
                                        </Form.Select>
                                    </div>
                                </div>
                                {coins.length > 0 &&
                                <>
                                    <div className='explore-table-list-content'>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>#</th>
                                                <th className='alignleft'>Coin</th>
                                                <th>Price</th>
                                                <th>1H%</th>
                                                <th>24H%</th>
                                                <th>Volume</th>
                                                <th>Last 7days</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {coins.map((coinItem: any, index: any) => (
                                                <tr onClick={()=>navigateDetail(coinItem)}>
                                                    <td>{index}</td>
                                                    <td>
                                                    <div className='explore-table-list-content-coin-main'>
                                                            <div className='explore-table-list-content-coin'>
                                                                <img src={coinItem.image} alt="mmosh" />
                                                                <h5>{coinItem.name}</h5>
                                                                <p>{coinItem.symbol}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{coinItem.price} MMOSH</td>
                                                    <td>
                                                        <div className={+ coinItem.price_oneh_start > coinItem.price_oneh_end ? "explore-table-list-content-percentage down" : "explore-table-list-content-percentage up"}>
                                                            {coinItem.price_oneh_start > coinItem.price_oneh_end &&
                                                                <ArrowDropDown />
                                                            }
                                                            {coinItem.price_oneh_start <= coinItem.price_oneh_end &&
                                                                <ArrowDropUp />
                                                            }
                                                            <label>{((coinItem.price_oneh_end - coinItem.price_oneh_start) / coinItem.price_oneh_start) * 100}%</label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={coinItem.price_oneday_start > coinItem.price_oneday_end ? "explore-table-list-content-percentage  down" : "explore-table-list-content-percentage  up"}>
                                                            {coinItem.price_oneday_start > coinItem.price_oneday_end &&
                                                                <ArrowDropDown />
                                                            }
                                                            {coinItem.price_oneday_start <= coinItem.price_oneday_end &&
                                                                <ArrowDropUp />
                                                            }
                                                            <label>{((coinItem.price_oneday_end - coinItem.price_oneday_start) / coinItem.price_oneday_start) * 100}%</label>
                                                        </div>
                                                    </td>
                                                    <td>{coinItem.price * coinItem.volume} MMOSH</td>
                                                    <td>
                                                    <div className='explore-table-list-content-graph'>
                                                        <Line options={tableoptions} data={{labels:coinItem.graph.labels,datasets: coinItem.graph.datas}} />
                                                    </div>
                                                    
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
                                </>

                                }

                            </div>
                        </div>
                    </div>

                </div>
            </>
        }



    </div>
  );
} 
