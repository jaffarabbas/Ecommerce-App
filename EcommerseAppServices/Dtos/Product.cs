using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerseAppDtos.Dtos;

[Table("PRODUCT")]
public partial class Product
{
    [Key]
    [Column("pid")]
    public int Pid { get; set; }

    [Column("name")]
    [StringLength(100)]
    [Unicode(false)]
    public string? Name { get; set; }

    [Column("description")]
    [StringLength(255)]
    [Unicode(false)]
    public string? Description { get; set; }

    [Column("price", TypeName = "decimal(10, 2)")]
    public decimal? Price { get; set; }

    [Column("image")]
    [Unicode(false)]
    public string? Image { get; set; }

    [Column("quantity")]
    public int? Quantity { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("cid")]
    public int? Cid { get; set; }

    [Required]
    [Column("product_status")]
    public bool? ProductStatus { get; set; }

    [ForeignKey("Cid")]
    [InverseProperty("Products")]
    public virtual Category? CidNavigation { get; set; }

    [InverseProperty("PidNavigation")]
    public virtual ICollection<TempUserOrder> TempUserOrders { get; set; } = new List<TempUserOrder>();

    [InverseProperty("PidNavigation")]
    public virtual ICollection<UserOrder> UserOrders { get; set; } = new List<UserOrder>();
}
