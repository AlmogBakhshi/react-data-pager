import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './index.css';

const DataPager = (props) => {
    const arrayOfItemsEachPage = (props.dataEachPage && Array.isArray(props.dataEachPage) && props.dataEachPage) || [20, 50, 100];
    const [countOfPages, setCountOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataEachPage, setDataEachPage] = useState(arrayOfItemsEachPage[0]);

    useEffect(() => {
        if (props.data) {
            const pages = Math.ceil(props.data.length / dataEachPage);
            setCountOfPages(pages);
            pages < currentPage && setCurrentPage(pages < 1 ? 1 : pages);
        }
    }, [props.data, dataEachPage])

    useEffect(() => {
        props.data && Array.isArray(props.data) && props.onChange(props.data.slice((currentPage - 1) * dataEachPage, props.data.length / dataEachPage > 1 &&
            currentPage * dataEachPage / props.data.length < 1 ? currentPage * dataEachPage % props.data.length : props.data.length))
    }, [props.data, dataEachPage, currentPage])

    const HandlePreventPage = () => {
        const setPage = currentPage > 1 ? currentPage - 1 : currentPage;
        setCurrentPage(setPage);
    }

    const HandleNextPage = () => {
        const setPage = currentPage < countOfPages ? currentPage + 1 : currentPage;
        setCurrentPage(setPage);
    }

    const HandleSelectedPages = (page) => {
        setCurrentPage(page);
    }

    const ShowPages = () => {
        let prevPages = [];
        let nextPages = [];
        for (let index = currentPage - 1; index >= 1 && index >= (currentPage - 3); index--) {
            prevPages.push(<span key={(index * -1)} style={{ cursor: 'pointer', marginRight: '5px' }} onClick={() => HandleSelectedPages(index)}>{index}</span>);
        }
        for (let index = currentPage; index <= countOfPages && index <= (currentPage + 3); index++) {
            nextPages.push(<span key={index} style={{ cursor: 'pointer', marginLeft: index !== currentPage && '5px', color: index === currentPage && (props.selectedPageColor || '#5C919B') }} onClick={() => HandleSelectedPages(index)}>{index}</span>);
        }
        const pages = [...prevPages.reverse(), ...nextPages]
        return pages;
    }

    return (
        (props.data && Array.isArray(props.data) && arrayOfItemsEachPage.length === 1 && props.data.length > dataEachPage &&
            <div className='disableTextSelectionHighlighting container onlyPager' style={props.style}>
                <div className='paging' style={props.stylePager}>
                    <FaAngleLeft size='1.3em' onClick={HandlePreventPage} style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '5px', color: '#5C919B' }} />
                    {ShowPages()}
                    <FaAngleRight size='1.3em' onClick={HandleNextPage} style={{ cursor: 'pointer', marginRight: '10px', marginLeft: '5px', color: '#5C919B' }} />
                </div>
            </div>)
        ||
        (props.data && Array.isArray(props.data) && props.data.length > dataEachPage &&
            <div className='disableTextSelectionHighlighting container pagerAndSelect' style={props.style} >
                <div className='' style={{ display: 'flex', width: 'fit-content' }}>
                    <select className='selectCountOfItems' style={props.styleDataEachPage} value={dataEachPage} onChange={e => setDataEachPage(e.target.value)}>
                        {arrayOfItemsEachPage.map(items => <option key={items} value={items}>{items}</option>)}
                    </select>
                </div>
                <div className='paging' style={props.stylePager} >
                    <FaAngleLeft size='1.3em' className='nextPrevButton' onClick={HandlePreventPage} style={props.styleNextPrevButton} />
                    {ShowPages()}
                    <FaAngleRight size='1.3em' className='nextPrevButton' onClick={HandleNextPage} style={props.styleNextPrevButton} />
                </div>
            </div>)
        || (props.data && Array.isArray(props.data) && props.data.length > arrayOfItemsEachPage[0] &&
            <div className='disableTextSelectionHighlighting container onlySelect' style={props.style}>
                <select className='selectCountOfItems' style={props.styleDataEachPage} value={dataEachPage} onChange={e => setDataEachPage(e.target.value)}>
                    {arrayOfItemsEachPage.map(items => <option key={items} value={items}>{items}</option>)}
                </select></div>)
        || null
    )
}

DataPager.propTypes = {
    data: PropTypes.array.isRequired,
    dataEachPage: PropTypes.arrayOf(PropTypes.number),
    onChange: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectedPageColor: PropTypes.string,
    stylePager: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styleNextPrevButton: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styleDataEachPage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default DataPager;