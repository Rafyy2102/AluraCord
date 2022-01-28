import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import appConfig from '../config.json';

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['100']};
                font-size: 24px;
                font-weight:600;
            }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {  
    const [userbio, setUserBio] = useState('');
    const [username, setUsername] = React.useState('');
    const userURL = `https://api.github.com/users/${username}`
    const roteamento = useRouter();

    function handleChange(event) {
        setUsername(event.target.value)

        if (event.target.value.length > 2) {
            fetch(userURL)
                .then(response => response.json())
                .then(data => setUserBio(data.bio))
        }
    }

    const imageSemUser = 'https://pa1.narvii.com/6208/60ee7a4fe7710a029531a62584ed8b01640db422_hq.gif';
   
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['050'],
                    backgroundImage: 'url(https://nobleorderbrewing.com/img/lists/05/one-piece-10-things-about-nefertari-vivi-that-make-no-sense-8.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '800px',
                        borderRadius: '20px', padding: '32px', margin: '-320px', marginTop: '0px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();                           
                            roteamento.push('/chat?user=${username}');
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Bem vindos 😉</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[999] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username} onChange={function handler(event) {                                
                                //onde ta o valor
                                const valor = event.target.value;
                                //trocar o valor pelo react
                                setUsername(valor);
                            }}
                            fullWidth
                            value={username}
                            onChange={handleChange}
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                width:'150px',
                                height:'150px',
                                marginBottom: '16px',
                            }}
                            
                            src={
                                username.length > 2
                                    ? `https://github.com/${username}.png`
                                    : imageSemUser
                            }

                        />
                        {
                            username.length > 2 && (
                                <>
                                    <Text
                                        variant="body4"
                                        styleSheet={{
                                            color: appConfig.theme.colors.neutrals[200],
                                            backgroundColor: appConfig.theme.colors.neutrals[900],
                                            padding: '3px 10px',
                                            borderRadius: '1000px'
                                        }}
                                    >
                                        {username}
                                    </Text>

                                    <Text
                                        variant="body4"
                                        styleSheet={{
                                            color: appConfig.theme.colors.neutrals[200],
                                            backgroundColor: appConfig.theme.colors.neutrals[900],
                                            padding: '3px 10px',
                                            borderRadius: '1000px'
                                        }}
                                    >
                                        {userbio}
                                    </Text>
                                </>
                            )
                        }

                    </Box>                  
                </Box>
            </Box>
        </>
    );
}