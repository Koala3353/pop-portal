import { useState } from 'react'
import { UploadCloud, FileImage, ShieldAlert, BadgeCheck, Loader2, Download } from 'lucide-react'
import axios from 'axios'
import clsx from 'clsx'

const API_BASE_URL = 'https://pop-api-mocha.vercel.app'

export default function VerificationWorkspace() {
    const [currentStep, setCurrentStep] = useState(1)

    // Step 1 State
    const [receiptFiles, setReceiptFiles] = useState([])
    const [isDraggingReceipts, setIsDraggingReceipts] = useState(false)

    // Step 2 & 3 State
    const [parsedResults, setParsedResults] = useState(null)
    const [isParsing, setIsParsing] = useState(false)
    const [parseProgress, setParseProgress] = useState(0)

    // Step 4 State
    const [historyFile, setHistoryFile] = useState(null)
    const [isDraggingHistory, setIsDraggingHistory] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [verificationResults, setVerificationResults] = useState(null)
    const [verificationError, setVerificationError] = useState(null) // New error state
    const [filterType, setFilterType] = useState('all') // 'all', 'matched', 'mismatch', 'not_found'

    const handleReceiptsUpload = (e) => {
        const files = Array.from(e.target.files || e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
        if (files.length > 0) setReceiptFiles(prev => [...prev, ...files])
        setIsDraggingReceipts(false)
    }

    const handleHistoryUpload = (e) => {
        const files = e.target.files || e.dataTransfer.files
        if (files && files[0]) {
            setHistoryFile(files[0])
            setVerificationError(null) // Clear error on new file selection
        }
        setIsDraggingHistory(false)
    }

    const parseReceipts = async () => {
        if (receiptFiles.length === 0) return
        setIsParsing(true)
        setParseProgress(0)

        try {
            let allResults = []
            let totalSuccessful = 0
            let processedBatches = 0

            const batches = []
            let currentBatch = []
            receiptFiles.forEach((file) => {
                currentBatch.push(file)
                if (currentBatch.length >= 5) {
                    batches.push(currentBatch)
                    currentBatch = []
                }
            })
            if (currentBatch.length > 0) batches.push(currentBatch)

            let currentIndex = 0

            async function worker() {
                while (currentIndex < batches.length) {
                    const index = currentIndex++
                    const batch = batches[index]

                    const formData = new FormData()
                    batch.forEach(file => formData.append('files', file))

                    try {
                        const response = await axios.post(`${API_BASE_URL}/parse-receipts`, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })
                        if (response.data && response.data.results) {
                            allResults.push(...response.data.results)
                            totalSuccessful += response.data.successful || response.data.results.length
                        }
                    } catch (err) {
                        console.error('Batch error:', err)
                    } finally {
                        processedBatches++
                        setParseProgress(Math.round((processedBatches / batches.length) * 100))
                    }
                }
            }

            const workers = []
            for (let i = 0; i < Math.min(10, batches.length); i++) {
                workers.push(worker())
            }
            await Promise.all(workers)

            setParsedResults({
                total: receiptFiles.length,
                successful: totalSuccessful,
                results: allResults
            })
            setCurrentStep(3) // Move to history upload step
        } catch (error) {
            console.error('Error parsing receipts:', error)
            alert('Failed to parse receipts. ' + (error.message))
        } finally {
            setIsParsing(false)
            setParseProgress(0)
        }
    }

    const verifyParsed = async () => {
        if (!historyFile || !parsedResults) return
        setIsVerifying(true)
        setVerificationError(null)

        try {
            const formData = new FormData()
            formData.append('history_pdf', historyFile)
            formData.append('receipts_json', JSON.stringify(parsedResults.results))

            const response = await axios.post(`${API_BASE_URL}/verify-parsed`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            setVerificationResults(response.data)
            setCurrentStep(4) // Move to results step
        } catch (error) {
            console.error('Error verifying receipts:', error)
            const errorMsg = error.response?.data?.detail || error.message
            setVerificationError(`Failed to verify: ${errorMsg}. Please ensure you uploaded a valid GCash/Maya transaction history file.`)
        } finally {
            setIsVerifying(false)
        }
    }

    const downloadCSV = () => {
        if (!verificationResults?.results) return
        const headers = ["Filename", "Receipt Amount", "Receipt Time", "Receipt Ref", "Verdict", "Details", "History Amount", "History Time", "History Ref"]
        const rows = [headers.join(",")]

        verificationResults.results.forEach(r => {
            const row = [
                `"${r.filename || ''}"`,
                `"${r.receipt?.amount || ''}"`,
                `"${r.receipt?.time || ''}"`,
                `"${r.receipt?.ref || ''}"`,
                `"${r.verdict || ''}"`,
                `"${(r.details || '').replace(/"/g, '""')}"`,
                `"${r.history_match?.amount || ''}"`,
                `"${r.history_match?.time || ''}"`,
                `"${r.history_match?.ref || ''}"`
            ]
            rows.push(row.join(","))
        })

        const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n")
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "verification_report.csv")
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>

            {/* Stepper */}
            <div className="stepper">
                {[
                    { label: 'Upload Receipts', active: currentStep >= 1 },
                    { label: 'Upload History', active: currentStep >= 3 },
                    { label: 'Results', active: currentStep >= 4 }
                ].map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className={clsx("step", step.active && "active", currentStep > idx + 1 && (idx === 0 ? currentStep >= 3 : currentStep >= 4) && "completed")}>
                            <div className="step-number">{idx + 1}</div>
                            <span style={{ fontWeight: 500 }}>{step.label}</span>
                        </div>
                        {idx < 2 && <div className={clsx("step-divider", step.active && "active")} />}
                    </div>
                ))}
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Step 1 & 2: Upload Receipts & Parse */}
                {currentStep === 1 && (
                    <div className="glass-card animate-fade-in text-center">
                        <h2 style={{ marginBottom: '0.5rem' }}>Upload Receipts</h2>
                        <p className="text-subtitle" style={{ marginBottom: '2rem' }}>
                            Select multiple receipt screenshots or an entire folder containing the images.
                        </p>

                        <label
                            className={clsx("file-upload-zone", isDraggingReceipts && "dropzone-active")}
                            onDragOver={(e) => { e.preventDefault(); setIsDraggingReceipts(true) }}
                            onDragLeave={(e) => { e.preventDefault(); setIsDraggingReceipts(false) }}
                            onDrop={(e) => { e.preventDefault(); handleReceiptsUpload(e) }}
                        >
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleReceiptsUpload}
                                style={{ display: 'none' }}
                            />
                            <UploadCloud />
                            <div>
                                <span className="text-gradient" style={{ fontWeight: 600 }}>Click to upload files</span>
                                <span> or drag and drop</span>
                            </div>
                            <p className="text-subtitle" style={{ fontSize: '0.875rem' }}>PNG, JPG, JPEG up to 10MB</p>
                        </label>

                        <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                            <label className="btn btn-secondary btn-sm" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                <input
                                    type="file"
                                    webkitdirectory="true"
                                    directory="true"
                                    onChange={handleReceiptsUpload}
                                    style={{ display: 'none' }}
                                />
                                Upload via Folder
                            </label>
                        </div>

                        {receiptFiles.length > 0 && (
                            <div style={{ textAlign: 'left', background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--rounded-lg)', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.125rem' }}>Selected Files ({receiptFiles.length})</h3>
                                    <button className="btn btn-secondary" onClick={() => setReceiptFiles([])} style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                                        Clear All
                                    </button>
                                </div>
                                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                    {receiptFiles.map((f, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            <FileImage size={16} />
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            onClick={parseReceipts}
                            disabled={receiptFiles.length === 0 || isParsing}
                        >
                            {isParsing ? (
                                <><Loader2 className="spinner" /> Parsing {receiptFiles.length} receipts... ({parseProgress}%)</>
                            ) : (
                                <>Next Step <BadgeCheck size={18} /></>
                            )}
                        </button>
                    </div>
                )}

                {/* Step 3: Upload History & Verify */}
                {currentStep === 3 && (
                    <div className="glass-card animate-fade-in text-center">
                        <h2 style={{ marginBottom: '0.5rem' }}>Upload Official History</h2>
                        <p className="text-subtitle" style={{ marginBottom: '2rem' }}>
                            Upload the GCash, Maya, or BDO PDF transaction history.
                        </p>

                        <div style={{ marginBottom: '1.5rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--rounded-lg)', textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: 'var(--status-success)' }}>
                                <BadgeCheck size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0 }}>Parsing Successful</h4>
                                <p className="text-subtitle" style={{ fontSize: '0.875rem', margin: 0 }}>
                                    Extracted {parsedResults?.successful} out of {parsedResults?.total} receipts successfully.
                                </p>
                            </div>
                        </div>

                        <label
                            className={clsx("file-upload-zone", isDraggingHistory && "dropzone-active")}
                            style={{ minHeight: '200px' }}
                            onDragOver={(e) => { e.preventDefault(); setIsDraggingHistory(true) }}
                            onDragLeave={(e) => { e.preventDefault(); setIsDraggingHistory(false) }}
                            onDrop={(e) => { e.preventDefault(); handleHistoryUpload(e) }}
                        >
                            <input
                                type="file"
                                accept="application/pdf, video/*"
                                onChange={handleHistoryUpload}
                                style={{ display: 'none' }}
                            />
                            <UploadCloud />
                            <div>
                                <span className="text-gradient" style={{ fontWeight: 600 }}>Click to upload history file</span>
                            </div>
                            <p className="text-subtitle" style={{ fontSize: '0.875rem' }}>PDF or Video format</p>
                        </label>

                        {historyFile && (
                            <div style={{ margin: '1rem 0 2rem 0', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}>
                                <FileImage className="text-gradient" />
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{historyFile.name}</div>
                                    <div className="text-subtitle" style={{ fontSize: '0.75rem' }}>{(historyFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                </div>
                                <button className="btn btn-secondary" onClick={() => setHistoryFile(null)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Remove</button>
                            </div>
                        )}

                        {verificationError && (
                            <div className="animate-fade-in" style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--rounded-lg)', textAlign: 'left', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <ShieldAlert size={20} className="text-error" style={{ color: 'var(--status-error)', flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <h4 style={{ margin: 0, color: 'var(--status-error)' }}>Verification Failed</h4>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{verificationError}</p>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setCurrentStep(1)}
                            >
                                Back
                            </button>
                            <button
                                className="btn btn-primary"
                                style={{ flex: 1 }}
                                onClick={verifyParsed}
                                disabled={!historyFile || isVerifying}
                            >
                                {isVerifying ? (
                                    <><Loader2 className="spinner" /> Verifying Transactions...</>
                                ) : (
                                    <>Verify {parsedResults?.total} Receipts <ShieldAlert size={18} /></>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Results */}
                {currentStep === 4 && verificationResults && (
                    <div className="glass-card animate-fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                display: 'inline-flex',
                                padding: '1rem',
                                borderRadius: '50%',
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: 'var(--status-success)',
                                marginBottom: '1rem'
                            }}>
                                <BadgeCheck size={48} />
                            </div>
                            <h1>Verification Complete</h1>
                            <p className="text-subtitle">We have successfully cross-checked your files.</p>
                        </div>

                        {/* Stats Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--rounded-lg)', textAlign: 'center' }}>
                                <div className="text-subtitle" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Receipts</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{verificationResults?.total_receipts || 0}</div>
                            </div>
                            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--rounded-lg)', textAlign: 'center', borderBottom: '2px solid var(--status-success)' }}>
                                <div className="text-subtitle" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Verified Matches</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--status-success)' }}>{verificationResults?.summary?.matched || 0}</div>
                            </div>
                            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--rounded-lg)', textAlign: 'center', borderBottom: '2px solid var(--status-error)' }}>
                                <div className="text-subtitle" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Mismatches & Not Found</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--status-error)' }}>
                                    {(verificationResults?.summary?.mismatch || 0) + (verificationResults?.summary?.not_found || 0)}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}>Results Details</h3>
                            <button className="btn btn-secondary btn-sm" onClick={downloadCSV} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 1rem' }}>
                                <Download size={16} /> Export CSV
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {['all', 'matched', 'mismatch', 'not_found'].map(type => (
                                <button
                                    key={type}
                                    className={clsx("btn btn-sm", filterType === type ? "btn-primary" : "btn-secondary")}
                                    onClick={() => setFilterType(type)}
                                    style={{ textTransform: 'capitalize', borderRadius: '100px', fontSize: '0.875rem', padding: '0.25rem 1rem' }}
                                >
                                    {type.replace('_', ' ')}
                                </button>
                            ))}
                        </div>

                        <div className="results-table-container">
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Filename</th>
                                        <th>Parsed Amount</th>
                                        <th>Status</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {verificationResults?.results?.filter(r => filterType === 'all' || r.verdict === filterType).map((report, idx) => (
                                        <tr key={idx}>
                                            <td style={{ fontWeight: 500, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={report.filename}>{report.filename || 'Unknown'}</td>
                                            <td>{report.receipt?.amount ? `₱${report.receipt.amount}` : 'N/A'}</td>
                                            <td>
                                                <span className={clsx("badge", report.verdict === 'mismatch' ? 'badge-error' : report.verdict === 'matched' ? 'badge-success' : 'badge-warning')}>
                                                    {report.verdict}
                                                </span>
                                            </td>
                                            <td className="text-subtitle" style={{ fontSize: '0.875rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={report.details}>
                                                {report.details || (report.verdict === 'matched' ? 'Perfect match' : 'Needs manual review')}
                                            </td>
                                        </tr>
                                    ))}
                                    {(!verificationResults?.results || verificationResults?.results.filter(r => filterType === 'all' || r.verdict === filterType).length === 0) && (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                                No receipts found for this filter.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <button className="btn btn-secondary" onClick={() => {
                                setCurrentStep(1)
                                setReceiptFiles([])
                                setParsedResults(null)
                                setHistoryFile(null)
                                setVerificationResults(null)
                            }}>
                                Start New Verification
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
