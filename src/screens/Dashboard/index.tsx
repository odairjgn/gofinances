import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLigthProps {
    amount: string;
}

interface HighLigthData {
    entries: HighLigthProps;
    expensives: HighLigthProps;
    total: HighLigthProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highLigthData, setHighLigthData] = useState<HighLigthData>({} as HighLigthData);

    const theme = useTheme();

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';

        /*async function removeAll() {
            await AsyncStorage.removeItem(dataKey);
        }
        removeAll();*/

        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type == 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }


                const amount = Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date
                };
            });

        setTransactions(transactionsFormatted);

        const total = entriesTotal - expensiveTotal;

        setHighLigthData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            },
            total: {
                amount: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
        });

        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    //Recarrega ao pegar foco
    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size='large'
                        />
                    </LoadContainer>
                    :
                    <>
                        <Header>
                            <UserWrapper>
                                <UserInfo>
                                    <Photo
                                        source={{ uri: 'https://avatars.githubusercontent.com/u/26652713?v=4' }}
                                    />
                                    <User>
                                        <UserGreeting>Olá, </UserGreeting>
                                        <UserName>Marilene</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton onPress={() => { }}>
                                    <Icon name='power' />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>
                        <HighlightCards>
                            <HighlightCard
                                type="up"
                                title="Entradas"
                                amount={highLigthData.entries.amount}
                                lastTransaction="Última entrada dia 13 de abril"
                            />
                            <HighlightCard
                                type="down"
                                title="Saídas"
                                amount={highLigthData.expensives.amount}
                                lastTransaction="Última saída dia 03 de abril"
                            />
                            <HighlightCard
                                type="total"
                                title="Total"
                                amount={highLigthData.total.amount}
                                lastTransaction="01 à 16 de abril"
                            />
                        </HighlightCards>
                        <Transactions>
                            <Title>Listagem</Title>

                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            >

                            </TransactionList>


                        </Transactions>
                    </>
            }
        </Container>
    )
}
