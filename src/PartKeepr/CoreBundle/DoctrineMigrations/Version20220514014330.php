<?php

namespace PartKeepr\CoreBundle\DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;

/**
 * 20220514 DJC: This adds a new Part.costingPrice to the database and calculates these figures.
 */ 

class Version20220514014330 extends BaseMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        //$this->performDatabaseUpgrade();

        // Add the costingPrice field to the database.
        $costingPriceAddSQL = 'ALTER TABLE Part ADD COLUMN IF NOT EXISTS costingPrice DECIMAL(13,4) NOT NULL AFTER averagePrice';
        $this->addSql($costingPriceAddSQL);

        // Re-save all parts in order to re-generate the averagePrice and costingPrice fields.

        $partRepository = $this->getEM()->getRepository(
            'PartKeeprPartBundle:Part'
        );

        $parts = $partRepository->findAll();

        foreach ($parts as $part) {
            $part->recomputeStockLevels();
        }

        $this->getEM()->flush();
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
    }
}
