import React, { Component } from 'react';
import moment from 'moment';
import ls from 'local-storage';

import CompareList from '../../components/CompareList';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import { Container, Form } from './styles';

export default class Main extends Component {
  state = {
    loadingAdd: false,
    loadingUpd: [],
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentWillMount() {
    const localRepository = ls.get('@GitCompare:localRepositories');
    if (localRepository) {
      this.setState({ repositories: localRepository });
    }
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loadingAdd: true });

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const localRepository = ls.get('@GitCompare:localRepositories');
      let addLocalRepository = [];
      if (localRepository) {
        addLocalRepository = localRepository;
      }
      addLocalRepository.push(repository);
      ls.set('@GitCompare:localRepositories', addLocalRepository);

      this.setState({
        repositoryInput: '',
        repositories: ls.get('@GitCompare:localRepositories'),
        repositoryError: false,
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loadingAdd: false });
    }
  };

  handleRemoveRepository = (index) => {
    const delRepository = [...this.state.repositories];
    delRepository.splice(index, 1);

    ls.set('@GitCompare:localRepositories', delRepository);

    this.setState({
      repositoryInput: '',
      repositories: delRepository,
      repositoryError: false,
    });
  };

  handleUpdateRepository = async (id, index) => {
    const { repositories } = this.state;
    const repository = repositories.find(repo => repo.id === id);

    const loadingUpd = [];
    loadingUpd[index] = true;
    this.setState({ loadingUpd });

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
        repositoryError: false,
      });

      await ls.set('@GitCompare:localRepositories', repositories);
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      const loadingUpd = [];
      loadingUpd[index] = false;
      this.setState({ loadingUpd });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loadingAdd ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>
        <CompareList
          repositories={this.state.repositories}
          delRepository={this.handleRemoveRepository}
          updRepository={this.handleUpdateRepository}
          loadingUpdate={this.state.loadingUpd}
        />
      </Container>
    );
  }
}
