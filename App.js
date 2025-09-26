import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const apiLink = "https://fabiooliveira.cloud/api_05/";
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, []);

  const produtosFiltrados = produtos.filter((item) =>
    (item.descricao.toLowerCase().includes(search.toLowerCase()) || item.categoria.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        style={styles.Input}
        placeholder="Pesquisar produto..."
        value={search}
        onChangeText={(texto) => setSearch(texto)}
      />

      <Text style={styles.titulo}>
        Lista De Produtos
      </Text>

      {produtosFiltrados.map((item) => (
        <Text key={item.codigoProduto} style={styles.ProdutosText}>
          <Text style={styles.span}>{item.descricao}</Text>
          {" "} - R$ {item.preco} (Estoque: {item.estoque})
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ProdutosText: {
    fontSize: 16,
    marginBottom: 5,
  },
  span: {
    fontWeight: 'bold',
  },
  Input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});
