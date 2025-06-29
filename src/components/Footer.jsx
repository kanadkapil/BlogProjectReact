import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="footer sm:footer-horizontal footer-center backdrop-blur-sm bg-black/30 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Kanad Kapil</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer