import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from './Spinner';
import { AlertCircle, ArrowLeft, Ban, CheckCircle, MessageSquare, ShieldAlert, Trash2 } from 'lucide-react';
import moment from 'moment'
import { Navbar } from './Layouts/Navbar';
import { Footer } from './Layouts/Footer';
import { notyf } from '../../assets/js/notyf';
import Swal from 'sweetalert2';
export const ReportDetails = () => {
    const { id } = useParams();
    const getReport = async () => {
        try {
            const res = await axios.get(`https://api.pixora.test/report/${id}`, { withCredentials: true, withXSRFToken: true });
            if (res.data.success) {
                return res.data.report;
            } else {
                console.error(res.data.message);
            }
        } catch (err) {
            console.log(err?.reponse?.data);
        }
    }

    const { data: report = {}, isLoading, error } = useQuery({
        queryKey: ['report', id],
        queryFn: getReport
    });

    if (error) return (<div className="error-state">
        <AlertCircle size={40} />
        <p>Error: {error.message}</p>
    </div>);

    const navigate = useNavigate();

    const renderTargetPreview = () => {
        if (report.status === 'resolved' && !report.photo_url) {
            return (
                <div className="preview-container deleted-content">
                    <Trash2 size={48} color="#94a3b8" />
                    <p>This content has been removed by administrative action.</p>
                </div>
            );
        }
        const type = report?.reportable_type?.toLowerCase() || '';

        if (type.includes('photo')) {
            return (
                <div className="preview-container photo-preview">
                    <img src={`https://api.pixora.test/storage/photos/${report?.photo_url}`} alt="Reported Content" onError={(e) => {
                        e.target.src = '/assets/images/deleted-placeholder.png';
                    }} />
                    <div className="preview-meta">Photo ID: #{report?.reportable_id}</div>
                </div>
            );
        }
        if (type.includes('comment')) {
            return (
                <div className="preview-container comment-preview">
                    <MessageSquare size={40} className="icon" />
                    <p className="comment-text">"{report.comment_body || report.description}"</p>
                    <div className="preview-meta">Comment ID: #{report.reportable_id}</div>
                </div>
            );
        }
        return (
            <div className="preview-container user-preview">
                <div className="user-avatar-large">{report?.target_name?.charAt(0)}</div>
                <h3>{report.target_name}</h3>
                <p>User Profile Report</p>
            </div>
        );
    };

    const statusToResolve = async (typeR) => {
        try {
            const res = await axios.post('https://api.pixora.test/report', { type: typeR, report_id: report?.id,reportableId:report?.reportable_id }, { withCredentials: true, withXSRFToken: true });
            if (res.data.success) {
                notyf.success(res.data.message);
                window.location.reload();
            } else {
                notyf.error(res.data.message);
                console.log(res.data.message);
            }
        } catch (err) {
            console.log(err?.reponse?.data);
        }
    }

    const deleteContent = async () => {
        Swal.fire({
            title: 'Delete Content',
            text: 'Are you sure for delete this photo ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes , delete it',
            confirmButtonColor: '#ed3d3d',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post('https://api.pixora.test/report', { type: 'delete_photo', report_id: report?.id, reportableId: report?.reportable_id }, { withCredentials: true, withXSRFToken: true });
                    if (res.data.success) {
                        notyf.success(res.data.message);
                        window.location.reload();
                    } else {
                        notyf.error(res.data.message);
                        console.log(res.data.message);
                    }
                } catch (err) {
                    console.log(err?.reponse?.data);
                }
            }
        })
    }

    return (
        <>
            <Navbar />
            {isLoading ? (<Spinner type={'mini'} text='Wait a few seconds ...' />) : (<div className="report-details-page glass-morphism">
                <div className="details-header">
                    <button onClick={() => navigate(-1)} className="back-btn">
                        <ArrowLeft size={20} /> Back to Reports
                    </button>
                    <div className="status-badge pending">Status: {report?.status}</div>
                </div>

                <div className="details-grid">
                    <div className="info-section">
                        <div className="section-block">
                            <div className="label-with-icon">
                                <ShieldAlert size={18} /> <span>Issue Reported</span>
                            </div>
                            <h1 className="reason-title">{report?.reason}</h1>
                            <p className="full-description">{report?.description}</p>
                        </div>

                        <div className="involved-parties">
                            <div className="party-card">
                                <span className="party-label">Reporter</span>
                                <div className="party-info">
                                    <div className="mini-avatar">R</div>
                                    <div>
                                        <div className="name">{report?.reporter_name}</div>
                                        <div className="date">{moment(report?.created_at).format('LLLL')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="party-card target">
                                <span className="party-label">Reported Target</span>
                                <div className="party-info">
                                    <div className="mini-avatar">T</div>
                                    <div>
                                        <div className="name">{report?.target_name}</div>
                                        <div className="id">ID: #{report?.reportable_id}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="action-footer">
                            {
                                report?.status === 'pending' && (
                                    <>
                                        <button className="admin-btn resolve" onClick={() => statusToResolve('resolved')}><CheckCircle size={18} /> Keep & Resolve</button>
                                        <button className="admin-btn delete" onClick={deleteContent}><Trash2 size={18} /> Delete Content</button>
                                        <button className="admin-btn ban" onClick={() => statusToResolve('bann_user')}><Ban size={18} /> Ban User</button>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    <div className="preview-section">
                        <div className="preview-card glass-morphism">
                            <div className="preview-header">Content Evidence</div>
                            {renderTargetPreview()}
                        </div>
                    </div>
                </div>
            </div>)}
            <Footer type={'dash'} />
        </>
    );
}
