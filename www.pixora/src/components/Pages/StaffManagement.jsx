import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';
import withReactComponent from 'sweetalert2-react-content';
import { showPixoraToast } from '../../assets/js/toast';

export const StaffManagement = () => {
    const queryClient = useQueryClient();

    const removeStaffRole = async (id) => {
        Swal.fire({
            title: 'Remove role from user',
            text: 'Are you sure for remove role from this user ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes , remove it',
            confirmButtonColor: '#ed3d3d',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post('https://api.pixora.test/remove_role', { user_id: id }, { withCredentials: true, withXSRFToken: true });
                    if (res.data.success) {
                        queryClient.invalidateQueries({ queryKey: ['adminAnalytics'] });
                        showPixoraToast(res.data.message);
                    } else {
                        showPixoraToast(`Error : ${res.data.message}`);
                    }
                } catch (err) {
                    console.log(err?.response?.data);
                }
            }
        })
    }

    const MySwal = withReactComponent(Swal);

    const handleChangeRole = async (id, username, role) => {
        MySwal.fire({
            title: <span style={{ color: '#0f172a' }}>Change User Role</span>,
            html: (
                <p className="text-gray-500">
                    You are changing the role for <b>{username}</b>
                </p>
            ),
            input: 'select',
            inputOptions: {
                'admin': 'Admin (Full Access)',
                'editor': 'Editor (Limited Access)',
                'user': 'Regular User'
            },
            inputValue: role,
            showCancelButton: true,
            confirmButtonText: 'Update Role',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#ef4444',
            background: 'rgba(255, 255, 255, 0.9)',
            backdrop: `rgba(15, 23, 42, 0.2) blur(8px)`,
            customClass: {
                popup: 'glass-morphism-popup',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post('https://api.pixora.test/change_role', { user_id: id, role: result.value }, { withCredentials: true, withXSRFToken: true });
                    if (res.data.success) {
                        queryClient.invalidateQueries({ queryKey: ['adminAnalytics'] });
                        showPixoraToast(res.data.message);
                    } else {
                        showPixoraToast(`Error : ${res.data.message}`);
                    }
                } catch (err) {
                    console.log(err?.response?.data);
                }
            }
        })
    }
    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: 'Delete user',
            text: 'Are you sure for delete this user ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes , remove it',
            confirmButtonColor: '#ed3d3d',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.post('https://api.pixora.test/delete_user', { user_id: id }, { withCredentials: true, withXSRFToken: true });
                    if (res.data.success) {
                        queryClient.invalidateQueries({ queryKey: ['adminAnalytics'] });
                        showPixoraToast(res.data.message);
                    } else {
                        showPixoraToast(`Error : ${res.data.message}`);
                    }
                } catch (err) {
                    console.log(err?.response?.data);
                }
            }
        })
    }
    return { removeStaffRole, handleChangeRole, handleDeleteUser }
}
