using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Models;

public partial class JewelSiteDBContext : DbContext
{
    public JewelSiteDBContext()
    {
    }

    public JewelSiteDBContext(DbContextOptions<JewelSiteDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AccountType> AccountTypes { get; set; }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Setting> Settings { get; set; }

    public virtual DbSet<TempUserOrder> TempUserOrders { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserOrder> UserOrders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AccountType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ACCOUNT___3213E83FC2D5156D");

            entity.Property(e => e.AcStatus).HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ADMIN__3213E83FA1696EC0");

            entity.Property(e => e.AcStatus).HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Cid).HasName("PK__CATEGORI__D837D05F557427F0");

            entity.Property(e => e.CStatus).HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.Conid).HasName("PK__CONTACT__908D93A35742211B");

            entity.Property(e => e.CoStatus).HasDefaultValueSql("((1))");
            entity.Property(e => e.Stamp).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Pid).HasName("PK__PRODUCT__DD37D91AA291620E");

            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ProductStatus).HasDefaultValueSql("((1))");

            entity.HasOne(d => d.CidNavigation).WithMany(p => p.Products)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_PRODUCT_CATEGORIES");
        });

        modelBuilder.Entity<TempUserOrder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TEMP_USE__3213E83F783648CA");

            entity.Property(e => e.Orderat).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.TmStatus).HasDefaultValueSql("((1))");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.TempUserOrders).HasConstraintName("FK_TEMP_USER_ORDERS_PRODUCT");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PK__USERS__DD70126404E621F0");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.UStatus).HasDefaultValueSql("((1))");

            entity.HasOne(d => d.Ac).WithMany(p => p.Users).HasConstraintName("FK_USER_ACCOUNT_TYPE");
        });

        modelBuilder.Entity<UserOrder>(entity =>
        {
            entity.HasKey(e => e.Oid).HasName("PK__USER_ORD__C2FFCF13E958C5B9");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Status).HasDefaultValueSql("((1))");

            entity.HasOne(d => d.PidNavigation).WithMany(p => p.UserOrders).HasConstraintName("FK_USER_ORDERS_PRODUCT");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.UserOrders).HasConstraintName("FK_USER_ORDERS_USER");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
