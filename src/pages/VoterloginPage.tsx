import React from 'react';

import { FaceID } from '../FaceID';

import loginpage from '../assets/loginpage.png';

import Divider from '@material-ui/core/Divider';

function VoterloginPage () {
    return (
        <>
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 100
                }}
            >
                <h3 style={{ fontSize: 24, fontWeight: 'bold' }}>
                    Voter Verification
                </h3>
                <Divider />

                <img src={loginpage} style={{ width: 500 }} alt='Logo' />

                <form
                    onSubmit={() => {}}
                    style={{ flexDirection: 'column', display: 'flex' }}
                >
                    <label style={{ fontSize: 20, marginTop: 20 }}>Email</label>

                    <input
                        style={{
                            borderWidth: 2,
                            borderColor: '#777',
                            width: 300
                        }}
                        type='text'
                        onChange={() => {}}
                    />

                    <label style={{ fontSize: 20, marginTop: 20 }}>
                        Password
                    </label>
                    <input
                        style={{
                            borderWidth: 2,
                            borderColor: '#777',
                            width: 300
                        }}
                        type='text'
                        onChange={() => {}}
                    />

                    <input
                        type='submit'
                        style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            fontSize: 20,
                            marginTop: 60,
                            padding: 10,
                            borderRadius: 5,
                            margin: 10
                        }}
                    />
                </form>
            </div>
        </>
    );
}

export default VoterloginPage;
