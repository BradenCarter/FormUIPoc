'use client';
import { Button } from "@mui/material"
import { TextField } from "@mui/material"
import { useState } from "react"

interface SubmissionSearchProps {
    handleSearch: (subscriberId: string) => Promise<void>;
}

export const SubmissionSearch = ({ handleSearch }: SubmissionSearchProps) => {
    const [subscriberId, setSubscriberId] = useState("")

    return (
        <div>
            <TextField
                label="Enter Subscriber ID"
                variant="outlined"
                value={subscriberId}
                onChange={(e) => setSubscriberId(e.target.value)}
                style={{ marginRight: '20px', height: '56px' }} // Updated margin-right
                InputProps={{
                    style: { color: 'white' },
                    classes: {
                        notchedOutline: 'white-border'
                    }
                }}
                InputLabelProps={{
                    style: { color: '#F2F3F4' }
                }}
                size="medium"
            />
            <Button variant="contained" color="primary" onClick={() => handleSearch(subscriberId)} size="medium" style={{ height: '56px' }}>
                Search
            </Button>
            </div>
    )

}

// Add the following CSS to your stylesheet
// .white-border {
//     border-color: white !important;
// }