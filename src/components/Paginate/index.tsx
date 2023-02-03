import React, { useEffect, useState, useId } from "react"
import { ContainerPaginate, ButtonPaginate } from "./styles"

interface Props{
    total:number
    lastPage:number
    perPage:number
    currentPage:number
    onClickPage: (key: number) => void
}

const Paginate: React.FC<Props> = (props) => {
    let prefix1 = useId();
    const [pages, setPages] = useState<any[]>([])

    useEffect(() => {
        let min = (props.currentPage < 5) ? 1 : (props.currentPage - 5)
        let max = (props.currentPage < 5) ? 10 : (props.currentPage + 5)
        let pgs = []
        for(var i=1; i<=props.lastPage; i++){
            if( i >= min && i <= max ) pgs.push(i)
        }
        setPages([...pgs])
    }, [props])

    const onClickPage = (page:number) => {
        props.onClickPage(page)
    }
    return (
        <>
        {pages.length > 0 &&
        <ContainerPaginate>

            <ButtonPaginate
                isDirect
                onClick={() => onClickPage(1)}
                style={{ borderRadius: '4px 0 0 4px' }}
            >
                ˂
            </ButtonPaginate>

            {pages.map((page) => (
                <ButtonPaginate 
                    key={prefix1 + page}
                    onClick={() => onClickPage(page)}
                    isActive={props.currentPage === page}
                >
                    {page}
                </ButtonPaginate>
            ))}

            <ButtonPaginate
                isDirect
                onClick={() => onClickPage(props.lastPage)}
                style={{ borderRadius: '0 4px 4px 0' }}
            >
                ˃
            </ButtonPaginate>
        </ContainerPaginate>
        }
        </>
    )
}

export default Paginate