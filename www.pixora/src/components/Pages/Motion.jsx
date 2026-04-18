import React from 'react'
import { motion } from 'framer-motion'
const Motion = ({ children }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {children}
        </motion.div>
    )
}

export default Motion