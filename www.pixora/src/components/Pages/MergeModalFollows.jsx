import React from 'react'
import ModalTemplate from './Templates/ModalTemplate';
import { FollowListe } from './FollowListe';

export const MergeModalFollows = ({ show, closeModal, id, type }) => {
    return (
        <ModalTemplate show={show} closeModal={closeModal}>
            <FollowListe userId={id} type={type} />
        </ModalTemplate>
    )
}
