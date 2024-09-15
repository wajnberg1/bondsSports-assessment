import React, { useState, useEffect } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Player } from './types/Player';
import { fetchPlayers } from './services/playerService';
import { fetchStats } from './services/statsService';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import styles from './App.module.css';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [favorites, setFavorites] = useState<Player[]>([]);
  const [newFavorite, setNewFavorite] = useState<Player>({} as Player);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // New error state
  const perPage = 10;

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true);
      setError(null); // Reset error before making a new request
      try {
        const data = await fetchPlayers(searchQuery);
        setPlayers(data.data);
      } catch (err) {
        setError('Failed to load players. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadPlayers();
  }, [searchQuery]);
  
  useEffect(() => {
    const loadStats = async () => {
	  if (newFavorite.id !== undefined) {
      setLoading(true);
      setError(null); // Reset error before making a new request
      try {
        const data = await fetchStats(newFavorite.id);
		const newPlayer: Player = {...newFavorite};
		newPlayer.stats = {...data};
        setFavorites([...favorites, newPlayer]);
      } catch (err) {
        setError('Failed to load stats. Please try again later.');
      } finally {
        setLoading(false);
      }
	  }
    };
    loadStats();
  }, [newFavorite]);

  const playerColumns: MRT_ColumnDef<Player>[] = [
    { accessorKey: 'first_name', header: 'First Name' },
    { accessorKey: 'last_name', header: 'Last Name' },
    { accessorKey: 'team.full_name', header: 'Team' },
    { accessorKey: 'position', header: 'Position' },
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToFavorites(row.original)}
        >
          Add to Favorites
        </Button>
      ),
    },
  ];
  
  const favoriteColumns: MRT_ColumnDef<Player>[] = [
    { accessorKey: 'first_name', header: 'First Name' },
    { accessorKey: 'last_name', header: 'Last Name' },
    { accessorKey: 'team.full_name', header: 'Team' },
    { accessorKey: 'position', header: 'Position' },
	{ accessorKey: 'stats', header: 'Stats' ,
	  Cell: ({ cell }) => {
        return JSON.stringify(cell.getValue());
      }
	},
    {
      id: 'actions',
      header: 'Actions',
      Cell: ({ row }: any) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => removeFromFavorites(row.original.id)}
        >
          Remove
        </Button>
      ),
    },
  ];

  const addToFavorites = (player: Player) => {
    if (!favorites.find((fav) => fav.id === player.id)) {
      setNewFavorite(player);
    }
  };

  const removeFromFavorites = (playerId: number) => {
    setNewFavorite({} as Player);
    setFavorites(favorites.filter((player) => player.id !== playerId));
  };

  return (
    <Box className={styles.container}>
      <div className={styles.gridContainer}>
        {/* Left Section: NBA Players */}
        <div className={styles.section}>
          <Typography className={styles.title}>NBA Players</Typography>

          {/* Search Input */}
          <TextField
            label="Search by name..."
            variant="outlined"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Error Handling */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Loading State */}
          {loading ? (
            <Typography>Loading players...</Typography>
          ) : (
            !error && (
              <MaterialReactTable                
                columns={playerColumns}
                data={players}                
              />
            )
          )}
        </div>

        {/* Right Section: Favorite Players */}
        <div className={styles.section}>
          <Typography className={styles.title}>Favorite Players</Typography>
          {favorites.length > 0 ? (
            <MaterialReactTable
              columns={favoriteColumns}
              data={favorites}
            />
          ) : (
            <Typography>No favorite players added yet.</Typography>
          )}
        </div>
      </div>
    </Box>
  );
};

export default App;
