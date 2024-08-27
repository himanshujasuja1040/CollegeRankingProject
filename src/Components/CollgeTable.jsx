import React, { useState, useEffect } from 'react';
import "../Components/CollegeTable.css"

const CollegeTable = ({ colleges }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'ascending' });
    const [visibleCount, setVisibleCount] = useState(10);
    const [loading, setLoading] = useState(false);

    const sortedColleges = [...colleges].sort((a, b) => {
        const aValue = sortConfig.key === 'placement' ? a[sortConfig.key].averagePackage : a[sortConfig.key];
        const bValue = sortConfig.key === 'placement' ? b[sortConfig.key].averagePackage : b[sortConfig.key];

        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleScroll = (e) => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
        if (bottom && !loading) {
            setLoading(true);
            setTimeout(() => {
                setVisibleCount(prev => {
                    const newRows = Math.min(prev + 10, sortedColleges.length);
                    return newRows;
                })
                setLoading(false);
            }, 1000)
        }
    };

    useEffect(() => {
        setVisibleCount(10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [colleges]);

    return (
        <div className="table-container" style={{width:'95vw'}}>
            <table className="college-table">
                <thead>
                    <tr className='tableHeader'>
                        <th onClick={() => handleSort('rank')} style={{ width: '10%', backgroundColor: "#309f9f" }}>Rank</th>
                        <th onClick={() => handleSort('college')} style={{ width: '30%', backgroundColor: "#309f9f" }}>College</th>
                        <th onClick={() => handleSort('fees')} style={{ width: '15%', backgroundColor: "#309f9f" }}>Course Fees</th>
                        <th onClick={() => handleSort('placement')} style={{ width: '20%', backgroundColor: "#309f9f" }}>Placement</th>
                        <th onClick={() => handleSort('userReview')} style={{ width: '15%', backgroundColor: "#309f9f" }}>User Review</th>
                        <th onClick={() => handleSort('ranking')} style={{ width: '10%', backgroundColor: "#309f9f" }}>Ranking</th>
                    </tr>
                </thead>
                <tbody className="tableBody">
                    {sortedColleges.slice(0, visibleCount).map((college, index) => (
                        <tr key={index}>
                            <td>#{college.rank}</td>
                            <td>
                                <div className="college-name">{college.college}</div>
                                <div className="college-actions">
                                    <span>Apply Now</span>
                                    <span>Download Broucher</span>
                                    <span>Add to Compare</span>
                                </div>
                            </td>
                            <td>{college.fees}</td>
                            <td>
                                <div className="placement-info">
                                    <div>
                                        <span style={{ color: '#309f9f' }}>{college.placement.averagePackage}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: 'black' }}>Average Package</span>
                                    </div>
                                    <div>
                                        <span style={{ color: '#309f9f' }}>{college.placement.highestPackage}</span>
                                        <br />
                                        <span style={{ fontSize: '10px', color: 'black' }}>Highest Package</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="user-review">
                                    <span>{college.userReview}/10</span>
                                    <br />
                                    <span style={{ fontSize: '10px', color: 'black' }}>Based on 454 users</span>
                                    <br />
                                    <span style={{ fontSize: '10px', color: 'black' }}>Reviews</span>
                                </div>
                            </td>
                            <td>{college.ranking}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CollegeTable;