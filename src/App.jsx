import { faDollarSign, faPeopleGroup, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import * as _ from "lodash";
import './App.css'
import { useEffect } from 'react';

function App() {
  const [name, setName] = useState("")
  const [salary, setSalary] = useState(0)
  const [totalSalary, setTotalSalary] = useState(0)
  const [totalTax, setTotalTax] = useState(0)
  const [error, setError] = useState("")
  const customerArray = JSON.parse(localStorage.getItem("customerArray") || "[]");
  const [customers, setCustomer] = useState(customerArray)

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleSalary = (e) => {
      setSalary(parseInt(e.target.value))
  }

  const handleAddCustomer = () => {
      let _salary_year = salary*12;
      let _tax_percent;
      let _tax_month = 0;
      let _tax_year = 0;

      if(salary === 0 || name === ""){
        setError("Invalid Input Format !!!");
        return 0;
      }

      if(salary <= 1000000){
        _tax_percent = 0
      }else if(salary <= 3000000){
        _tax_percent = 5
      }else if(salary <= 6000000){
        _tax_percent = 7
      }else {
        _tax_percent = 10
      }
      
      if(salary > 1000000) {
        _tax_month = salary*5/100;
        _tax_year = _salary_year*5/100;
      }


      setCustomer(
        [
          ...customers,
          {
            name: name,
            salary: salary,
            salary_year: _salary_year,
            tax_percent: _tax_percent,
            tax_month: _tax_month,
            tax_year: _tax_year,
          }
        ]
      )
  } 

  const handleReset = () => {
    setName("")
    setSalary(0)
    setError("")
  }

  const clearCustomer = () => {
    setCustomer([])
  }

  const filteredFivePercentTax = customers?.filter((customer)=> customer?.tax_percent === 5).length
  const filteredSevenPercentTax = customers?.filter((customer)=> customer?.tax_percent === 7).length
  const filteredTenPercentTax = customers?.filter((customer)=> customer?.tax_percent === 10).length
  const filteredFreeTax = customers?.filter((customer)=> customer?.tax_percent === 0).length
  const filteredSalary = customers?.map((customer)=> customer?.salary);
  const filteredYearTax = customers?.map((customer)=> customer?.tax_year);
  const sumSalary = _.sum(filteredSalary);
  const sumYearTax = _.sum(filteredYearTax);

  useEffect(()=>{
    setTotalTax(sumYearTax)
    setTotalSalary(sumSalary)
    localStorage.setItem("customerArray", JSON.stringify(customers))
  },[customers])


  const formatCurrencyLAK = (money) => {
    let formator = new Intl.NumberFormat('en-US');
    let _money = formator.format(money);
    return _money
  }


  return (
    <div className="App bg-primary min-h-screen">
        <div className='container mx-auto'>
          <div className='py-8'>
            <h1 className='text-2xl text-white font-bold text-left'>Tax Management</h1>
            <h1 className='text-lg text-gray-500 font-bold text-left'>Dev @jinjiplsdontcry</h1>
          </div>
          <div className='min-h-screen flex'>
              <div className='border-t-2 border-fourth w-[40%] p-8 flex flex-col'>
                      <h2 className='text-white mb-2 text-left text-xl'>Name and Surname</h2>
                      <input value={name} onChange={(e)=>handleName(e)} type="text" placeholder='Enter Your Name' className='text-white mb-3 p-3 rounded-md border-third border-2 outline-none' style={{background: 'transparent'}}/>
                      <h2 className='text-white mb-2 text-left text-xl'>Salary</h2>
                      <input value={salary} onChange={(e)=>handleSalary(e)} type="number" placeholder='Enter Salary' className='text-whitemb-3 p-3 rounded-md border-third border-2 text-white outline-none' style={{background: 'transparent'}}/>

                     <div className='flex'>
                     <button onClick={()=>handleAddCustomer()} className='text-white text-lg py-1 mr-5 rounded bg-fourth hover:scale-105 active:opacity-60 transition-all ease-linear duration-200 px-2 mt-10 border w-28'>Add</button>
                      <button onClick={()=>handleReset()} className='text-white text-lg py-1 mr-5 rounded bg-fourth hover:scale-105 active:opacity-60 transition-all ease-linear duration-200 px-2 mt-10 border w-28'>Reset</button>
                      <button onClick={()=>clearCustomer()} className='text-white text-lg py-1 mr-5 rounded bg-fourth hover:scale-105 active:opacity-60 transition-all ease-linear duration-200 px-2 mt-10 border w-28'>Clear</button>
                     </div>

                     <h2 className={error === "" ? 'opacity-0 text-xl text-left my-3 text-secondary' :'opacity-100 text-xl text-left my-3 text-secondary'}><FontAwesomeIcon icon={faSkullCrossbones}/> {" "+error}</h2>

                      <div className='flex flex-col my-20 border-t-2 border-fourth text-white'>
                      <div className='flex mb-4'>
                        <div className='bg-third rounded flex-1 h-18 justify-center flex flex-col p-3 items-center mr-4'>
                            <h1 className='text-xl'>ຈຳນວນຄົນ</h1>
                            <div className='flex items-center'>
                            <FontAwesomeIcon icon={faPeopleGroup}/>
                            <h3 className='ml-2 text-xl'>{customers?.length}</h3>
                            </div>
                        </div>
                        <div className='bg-third rounded flex-1 h-18 justify-center flex flex-col p-3 items-center mr-4'>
                            <h1 className='text-xl'>ບ່ໍເສຍພາສີ</h1>
                            <div className='flex items-center'>
                            <FontAwesomeIcon icon={faPeopleGroup}/>
                            <h3 className='ml-2 text-xl'>{filteredFreeTax}</h3>
                            </div>
                        </div>
                        <div className='bg-third rounded flex-1 h-18 justify-center flex flex-col p-3 items-center'>
                            <h1 className='text-xl'>ເສຍພາສີ 5%</h1>
                            <div className='flex items-center'>
                            <FontAwesomeIcon icon={faPeopleGroup}/>
                            <h3 className='ml-2 text-xl'>{filteredFivePercentTax}</h3>
                            </div>
                        </div>
                      </div>
                      <div className='flex'>
                        <div className='bg-third rounded flex-1 h-18 justify-center flex flex-col p-3 items-center mr-4'>
                              <h1 className='text-xl'>ເສຍພາສີ 7%</h1>
                              <div className='flex items-center'>
                              <FontAwesomeIcon icon={faPeopleGroup}/>
                              <h3 className='ml-2 text-xl'>{filteredSevenPercentTax}</h3>
                              </div>
                          </div>
                        <div className='bg-third rounded flex-1 h-18 justify-center flex flex-col p-3 items-center mr-4'>
                              <h1 className='text-xl'>ເສຍພາສີ 10%</h1>
                              <div className='flex items-center'>
                              <FontAwesomeIcon icon={faPeopleGroup}/>
                              <h3 className='ml-2 text-xl'>{filteredTenPercentTax}</h3>
                              </div>
                          </div>
                          <div className='bg-third rounded flex-1 h-18 justify-center flex flex-col p-3 items-center'>
                              <h1 className='text-xl'>ເງິນລວມທັງຫມົດ</h1>
                              <div className='flex items-center'>
                              <FontAwesomeIcon icon={faDollarSign}/>
                              <h3 className='ml-2 text-xl'>{formatCurrencyLAK(totalSalary)}</h3>
                              </div>
                          </div>
                      </div>
                      <div className='flex'>
                          <div className='bg-third rounded mt-4 flex-1 h-18 justify-center flex flex-col p-3 items-center'>
                              <h1 className='text-xl'>ເງິນພາສີທັງຫມົດ</h1>
                              <div className='flex items-center'>
                              <FontAwesomeIcon icon={faDollarSign}/>
                              <h3 className='ml-2 text-xl'>{formatCurrencyLAK(totalTax)}</h3>
                              </div>
                          </div>
                      </div>
              </div>
              </div>
              <div className='border-t-2 border-l-2 border-fourth w-[60%] p-8 text-white'>
                      <table>
                        <thead>
                          <tr>
                            <th>Name and Surname</th>  
                            <th>Salary</th>  
                            <th>Salary / Year</th>  
                            <th>Tax %</th>
                            <th>Tax / Month</th>
                            <th>Tax / Year</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                            customers.map((customer, index)=>(
                              <tr key={index}>
                                <td>{customer?.name}</td>
                                <td>{formatCurrencyLAK(customer?.salary)}</td>
                                <td>{formatCurrencyLAK(customer?.salary_year)}</td>
                                <td>{customer?.tax_percent} %</td>
                                <td>{formatCurrencyLAK(customer?.tax_month)}</td>
                                <td>{formatCurrencyLAK(customer?.tax_year)}</td>
                              </tr>  
                            ))
                          }
                        </tbody>
                      </table>                      
              </div>
          </div>
        </div>
    </div>
  )
}

export default App
