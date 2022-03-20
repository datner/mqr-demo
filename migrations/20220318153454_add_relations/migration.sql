-- CreateTable
CREATE TABLE "_Restaurant_menus" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_Menu_items" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Restaurant_menus_AB_unique" ON "_Restaurant_menus"("A", "B");

-- CreateIndex
CREATE INDEX "_Restaurant_menus_B_index" ON "_Restaurant_menus"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Menu_items_AB_unique" ON "_Menu_items"("A", "B");

-- CreateIndex
CREATE INDEX "_Menu_items_B_index" ON "_Menu_items"("B");

-- AddForeignKey
ALTER TABLE "_Restaurant_menus" ADD FOREIGN KEY ("A") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Restaurant_menus" ADD FOREIGN KEY ("B") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Menu_items" ADD FOREIGN KEY ("A") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Menu_items" ADD FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
