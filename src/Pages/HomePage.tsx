import React, { useEffect, useState } from 'react'
import RepoCard from '../Components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';

const HomePage = () => {
    const [search,setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced,{
        skip: debounced.length < 3 
    });
     
  const [fetchRepos, {isLoading: areReposLoading , data: repos}] = useLazyGetUserReposQuery()
   

   useEffect(()=>{
     setDropdown(debounced.length < 3 && data?.length! > 0)
   },[debounced, data])
    

   const clickHandler = (userName: string) => {
       fetchRepos(userName)
       setDropdown(false)
   } 

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
        {isError && <p className='text-center text-red-600'>Ошибка</p>}
       <div className='relative w-[560px] '>
        <input 
        type="text"
        className='border py-2 px-4 w-full h-[42px] mb-2'
        placeholder='поиск по гитхабу юзеров'
        value={search}
        onChange={e => setSearch(e.target.value)}
        />

        <ul className='list-none absolute top-[42px] left-0 right-0 max-h-[600px] shadow-md bg-white'>
            {isLoading && <p className='text-center'>загрузка..... подождите</p>}
            {data?.map(user =>(
                <li 
                key={user.id}
                onClick={()=> clickHandler(user.login)}
                className="py-2 px-2 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                      {user.login}
                </li>
            ))}
        </ul>
       </div>

     <div className='container'>
        {areReposLoading && <p className='text center'>загрузка....</p>} 
        {repos?.map(repo => <RepoCard key={repo.id} repo={repo}/>)}
     </div>


    </div>
  )
}

export default HomePage;